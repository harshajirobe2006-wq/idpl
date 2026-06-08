export interface TmMetadataJson {
  labels: string[]
  imageSize?: number
  grayscale?: boolean
  tfjsVersion?: string
  modelName?: string
}

export interface ClassifierBundle {
  labels: string[]
  imageSize: number
  grayscale: boolean
}

export interface ClassPrediction {
  className: string
  probability: number
}
