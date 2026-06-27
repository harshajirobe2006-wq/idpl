export async function createThumbnail(image: HTMLImageElement, maxSize = 96): Promise<string> {
  const canvas = document.createElement("canvas")
  const scale = Math.min(maxSize / image.naturalWidth, maxSize / image.naturalHeight, 1)
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))

  const ctx = canvas.getContext("2d")
  if (!ctx) return ""

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL("image/jpeg", 0.72)
}
