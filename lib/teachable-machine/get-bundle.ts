import type { LayersModel } from '@tensorflow/tfjs'

import { loadClassifier, type ClassifierBundle } from './classifier'

export type LoadedClassifier = ClassifierBundle & { model: LayersModel }

const MODEL_JSON = '/model/model.json'
const METADATA_JSON = '/model/metadata.json'

let bundlePromise: Promise<LoadedClassifier> | null = null

/** Single in-flight load for the lifetime of the page (survives React Strict Mode remounts). */
export function getTeachableImageClassifier(): Promise<LoadedClassifier> {
  if (!bundlePromise) {
    bundlePromise = loadClassifier(MODEL_JSON, METADATA_JSON)
  }
  return bundlePromise
}
