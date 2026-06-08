import * as tf from '@tensorflow/tfjs'

import type { ClassifierBundle, ClassPrediction, TmMetadataJson } from './types'
import { cropToSquareCanvas } from './preprocess'

export function formatClassLabel(raw: string): string {
  return raw
    .split(/\s+/)
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(' ')
}

/** Center square crop on pixel tensor (TM RGB path). */
function cropTensor(img: tf.Tensor3D): tf.Tensor3D {
  const size = Math.min(img.shape[0], img.shape[1])
  const centerHeight = img.shape[0] / 2
  const beginHeight = centerHeight - size / 2
  const centerWidth = img.shape[1] / 2
  const beginWidth = centerWidth - size / 2
  return img.slice([beginHeight, beginWidth, 0], [size, size, 3])
}

export async function fetchTmMetadata(url: string): Promise<ClassifierBundle> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load metadata (${res.status})`)
  const data = (await res.json()) as TmMetadataJson
  if (!Array.isArray(data.labels) || data.labels.length === 0) {
    throw new Error('metadata.json is missing labels')
  }
  return {
    labels: data.labels,
    imageSize: typeof data.imageSize === 'number' ? data.imageSize : 224,
    grayscale: Boolean(data.grayscale),
  }
}

export async function loadClassifier(
  modelJsonUrl: string,
  metadataJsonUrl: string,
): Promise<{ model: tf.LayersModel } & ClassifierBundle> {
  const [model, meta] = await Promise.all([
    tf.loadLayersModel(modelJsonUrl),
    fetchTmMetadata(metadataJsonUrl),
  ])
  return { model, ...meta }
}

export async function predictClasses(
  model: tf.LayersModel,
  meta: ClassifierBundle,
  image: HTMLImageElement,
): Promise<ClassPrediction[]> {
  const canvas = cropToSquareCanvas(image, meta.imageSize)
  const output = tf.tidy(() => {
    const pixels = tf.browser.fromPixels(canvas)
    const cropped = cropTensor(pixels as tf.Tensor3D)
    const batched = cropped.expandDims(0).toFloat().div(tf.scalar(127)).sub(tf.scalar(1))
    return model.predict(batched) as tf.Tensor
  })
  const values = Array.from(await output.data())
  output.dispose()

  return meta.labels.map((label, i) => ({
    className: formatClassLabel(label),
    probability: values[i] ?? 0,
  }))
}
