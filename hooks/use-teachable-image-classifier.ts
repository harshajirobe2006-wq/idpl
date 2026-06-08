"use client"

import type { LayersModel } from '@tensorflow/tfjs'
import { useEffect, useState } from 'react'

import { getTeachableImageClassifier } from '@/lib/teachable-machine/get-bundle'
import type { ClassifierBundle } from '@/lib/teachable-machine/types'

export type ModelLoadState =
  | { status: 'loading' }
  | { status: 'ready'; model: LayersModel; meta: ClassifierBundle }
  | { status: 'error'; message: string }

export function useTeachableImageClassifier() {
  const [state, setState] = useState<ModelLoadState>({ status: 'loading' })

  useEffect(() => {
    getTeachableImageClassifier()
      .then(({ model, labels, imageSize, grayscale }) => {
        setState({
          status: 'ready',
          model,
          meta: { labels, imageSize, grayscale },
        })
      })
      .catch((err: unknown) => {
        setState({
          status: 'error',
          message: err instanceof Error ? err.message : 'Failed to load model',
        })
      })
  }, [])

  return state
}
