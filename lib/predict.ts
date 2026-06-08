import * as tf from "@tensorflow/tfjs"

export interface PredictionItem {
  rawLabel: string
  className: string
  fruitName: string | null
  ripeness: string
  probability: number
}

export interface PredictionResult {
  fruitName: string | null
  ripeness: string
  confidence: number
  isLowConfidence: boolean
  topPrediction: PredictionItem
  predictions: PredictionItem[]
}

interface ModelBundle {
  model: tf.LayersModel
  labels: string[]
  imageSize: number
}

interface TeachableMetadata {
  labels: string[]
  imageSize?: number
}

const MODEL_URL = "/model/model.json"
const METADATA_URL = "/model/metadata.json"
const DEFAULT_IMAGE_SIZE = 224
const UNKNOWN_THRESHOLD = 0.25
const LOW_CONFIDENCE_FRUIT = "Low confidence prediction"
const LOW_CONFIDENCE_RIPENESS = "Try another image"

let modelBundlePromise: Promise<ModelBundle> | null = null

function toTitleCase(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

function normalizeToken(value: string): string {
  return value.trim().toLowerCase().replace(/[-\s]+/g, "_")
}

function formatRipeness(value: string): string {
  const normalized = normalizeToken(value)
  if (normalized === "over_ripe" || normalized === "overripe") return "Overripe"
  if (normalized === "unripe") return "Unripe"
  if (normalized === "ripe") return "Ripe"
  return toTitleCase(value.replace(/[_-]+/g, " "))
}

function parseClassLabel(label: string): Omit<PredictionItem, "probability"> {
  const normalized = label.trim()
  const parts = normalized.split("_").map((part) => part.trim()).filter(Boolean)

  // Teachable Machine labels can be either:
  // 1) "<fruit>_<ripeness>" or "<fruit>_<over>_<ripe>"
  // 2) legacy ripeness-only labels ("ripe", "over ripe", ...)
  if (parts.length >= 2) {
    const fruitToken = parts[0]
    const ripenessToken = parts.slice(1).join("_")
    const fruitName = toTitleCase(fruitToken.replace(/[-_]+/g, " "))
    const ripeness = formatRipeness(ripenessToken)
    return {
      rawLabel: label,
      className: `${fruitName} - ${ripeness}`,
      fruitName,
      ripeness,
    }
  }

  const ripeness = formatRipeness(normalized)
  return {
    rawLabel: label,
    className: ripeness,
    fruitName: null,
    ripeness,
  }
}

async function loadMetadata(): Promise<TeachableMetadata> {
  const response = await fetch(METADATA_URL)
  if (!response.ok) {
    throw new Error(`Failed to load metadata.json (${response.status})`)
  }

  const metadata = (await response.json()) as TeachableMetadata
  if (!Array.isArray(metadata.labels) || metadata.labels.length === 0) {
    throw new Error("metadata.json is missing labels")
  }
  const normalizedLabels = metadata.labels.map((label) => label.trim()).filter(Boolean)
  if (normalizedLabels.length === 0) {
    throw new Error("metadata.json labels are empty")
  }
  metadata.labels = normalizedLabels

  return metadata
}

export async function loadPredictionModel(): Promise<ModelBundle> {
  if (!modelBundlePromise) {
    modelBundlePromise = Promise.all([tf.loadLayersModel(MODEL_URL), loadMetadata()]).then(
      ([model, metadata]) => ({
        model,
        labels: metadata.labels,
        imageSize: metadata.imageSize ?? DEFAULT_IMAGE_SIZE,
      }),
    )
  }

  return modelBundlePromise
}

function preprocessImage(image: HTMLImageElement, imageSize: number): tf.Tensor4D {
  return tf.tidy(() => {
    const pixels = tf.browser.fromPixels(image)
    const resized = tf.image.resizeBilinear(pixels, [imageSize, imageSize])
    const normalized = resized.toFloat().div(255)
    return normalized.expandDims(0)
  })
}

export async function predictFromImage(image: HTMLImageElement): Promise<PredictionResult> {
  const { model, labels, imageSize } = await loadPredictionModel()

  const input = preprocessImage(image, imageSize)
  const output = model.predict(input)
  const outputTensor = Array.isArray(output) ? output[0] : output
  if (!outputTensor || !(outputTensor instanceof tf.Tensor)) {
    input.dispose()
    throw new Error("Model prediction output is invalid")
  }
  const values = Array.from(await outputTensor.data())
  input.dispose()
  outputTensor.dispose()

  const predictions = labels
    .map((label, index) => ({
      ...parseClassLabel(label),
      probability: values[index] ?? 0,
    }))
    .sort((a, b) => b.probability - a.probability)
  console.log("Predictions:", predictions)

  const best = predictions[0] ?? {
    rawLabel: "unknown",
    className: LOW_CONFIDENCE_FRUIT,
    fruitName: null,
    ripeness: LOW_CONFIDENCE_RIPENESS,
    probability: 0,
  }
  const isLowConfidence = best.probability < UNKNOWN_THRESHOLD
  const fruitName = isLowConfidence ? LOW_CONFIDENCE_FRUIT : best.fruitName
  const ripeness = isLowConfidence ? LOW_CONFIDENCE_RIPENESS : best.ripeness

  return {
    fruitName,
    ripeness,
    confidence: best.probability,
    isLowConfidence,
    topPrediction: best,
    predictions,
  }
}
