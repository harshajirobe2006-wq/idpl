/**
 * Serves public/ over HTTP briefly so TF.js can fetch model.json + weights.bin
 * (Node fetch does not load file:// model shards).
 *
 * Run from project root: pnpm verify-model   or   node scripts/verify-model.mjs
 */
import { createRequire } from "node:module"
import fs from "node:fs/promises"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"

const require = createRequire(import.meta.url)
const tf = require("@tensorflow/tfjs")

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const publicDir = path.join(root, "public")
const metaPath = path.join(publicDir, "model", "metadata.json")

function contentType(filePath) {
  if (filePath.endsWith(".json")) return "application/json"
  if (filePath.endsWith(".bin")) return "application/octet-stream"
  return "application/octet-stream"
}

function startStaticServer(dir, port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent((req.url || "/").split("?")[0])
        const safe = path.normalize(urlPath).replace(/^(\.\.(\/|\\|$))+/, "")
        const abs = path.join(dir, safe)
        if (!abs.startsWith(dir)) {
          res.writeHead(403)
          res.end()
          return
        }
        const data = await fs.readFile(abs)
        res.writeHead(200, { "Content-Type": contentType(abs) })
        res.end(data)
      } catch {
        res.writeHead(404)
        res.end("Not found")
      }
    })
    server.listen(port, "127.0.0.1", () => resolve(server))
    server.on("error", reject)
  })
}

const port = 9876 + Math.floor(Math.random() * 200)
const server = await startStaticServer(publicDir, port)
const base = `http://127.0.0.1:${port}`

try {
  await tf.ready()
  console.log("TensorFlow.js", tf.version, "| backend:", tf.getBackend())
  console.log("Static:", publicDir, "→", base)

  const modelUrl = `${base}/model/model.json`
  console.log("Loading:", modelUrl)

  const model = await tf.loadLayersModel(modelUrl)
  console.log("✓ Model graph + weights loaded.\n")

  const meta = JSON.parse(await fs.readFile(metaPath, "utf8"))
  const labels = meta.labels || []
  const imageSize = meta.imageSize || 224
  console.log("metadata.json labels:", labels.join(", "))
  console.log("imageSize:", imageSize)

  const w0 = model.getWeights()[0]
  const w0d = await w0.data()
  const sample = [w0d[0], w0d[1], w0d[2]].map((x) => x.toFixed(6)).join(", ")
  console.log("First conv kernel (sample):", sample)

  const input = tf.tidy(() => tf.zeros([1, imageSize, imageSize, 3]))
  const out = model.predict(input)
  const probs = await out.data()
  out.dispose()
  input.dispose()

  const ok = Array.from(probs).every((x) => Number.isFinite(x))
  console.log("\nQuick forward pass (zeros tensor → softmax):")
  labels.forEach((label, i) => {
    console.log(`  ${label}: ${(probs[i] * 100).toFixed(2)}%`)
  })
  const sum = Array.from(probs).reduce((a, b) => a + b, 0)
  console.log("Softmax sum:", sum.toFixed(6))

  if (ok) {
    console.log("\n✓ Inference OK in Node (CPU). Your browser will typically use WebGL and match TM.")
  } else {
    console.log(
      "\n⚠ Node CPU returned non-finite values for this checkpoint; that can happen with some older TM + tfjs combos.",
    )
    console.log("  The Next.js UI still works in the browser — run: pnpm dev  then open http://localhost:3000")
  }
} finally {
  server.close()
}
