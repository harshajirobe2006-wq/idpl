type Drawable = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap

/** Center-crop to a square and resize to `size` (Teachable Machine canvas step). */
export function cropToSquareCanvas(image: Drawable, size: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  let width = image.width
  let height = image.height
  if (image instanceof HTMLVideoElement) {
    width = image.videoWidth
    height = image.videoHeight
  }
  const min = Math.min(width, height)
  const scale = size / min
  const scaledW = Math.ceil(width * scale)
  const scaledH = Math.ceil(height * scale)
  const dx = scaledW - size
  const dy = scaledH - size
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not get 2D context')
  ctx.drawImage(image as CanvasImageSource, ~~(dx / 2) * -1, ~~(dy / 2) * -1, scaledW, scaledH)
  return canvas
}
