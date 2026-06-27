export type PredictionMode = "detailed" | "quick"

export const PREDICTION_MODES: {
  value: PredictionMode
  icon: string
  title: string
  description: string
}[] = [
  {
    value: "detailed",
    icon: "📊",
    title: "Detailed Analysis",
    description: "Shows confidence for all ripeness classes.",
  },
  {
    value: "quick",
    icon: "⚡",
    title: "Quick Prediction",
    description: "Shows only the most probable ripeness.",
  },
]
