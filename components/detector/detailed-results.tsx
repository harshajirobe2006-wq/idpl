import type { PredictionItem } from "@/lib/predict"
import { Progress } from "@/components/ui/progress"

interface DetailedResultsProps {
  topPrediction: PredictionItem
  predictions: PredictionItem[]
  fruitEmoji: string
  displayFruit: string
  displayRipeness: string
  confidence: number | null
  isLowConfidence: boolean
}

export function DetailedResults({
  topPrediction,
  predictions,
  fruitEmoji,
  displayFruit,
  displayRipeness,
  confidence,
  isLowConfidence,
}: DetailedResultsProps) {
  const confidencePct = ((confidence ?? topPrediction.probability) * 100).toFixed(1)

  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-amber-50 p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Top prediction</p>
        {displayFruit && (
          <p className="mt-1 text-2xl font-bold text-emerald-700">
            {fruitEmoji} {displayFruit}
          </p>
        )}
        <p className={displayFruit ? "mt-1 text-lg font-medium" : "mt-1 text-2xl font-bold text-emerald-700"}>
          {displayRipeness}
        </p>
        {isLowConfidence && (
          <p className="mt-1 text-sm font-medium text-amber-700">Low confidence prediction</p>
        )}
        <p className="mt-1 text-sm text-muted-foreground">
          Confidence:{" "}
          <span className="font-semibold text-emerald-700">{confidencePct}%</span>
        </p>
      </div>

      <ul className="space-y-4">
        {predictions.map((row) => {
          const pct = row.probability * 100
          return (
            <li
              key={row.rawLabel}
              className="rounded-xl border bg-background/70 p-3 transition-colors hover:bg-muted/40"
            >
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium">
                  {row.fruitName ? `${row.fruitName} - ${row.ripeness}` : row.ripeness}
                </span>
                <span className="tabular-nums text-muted-foreground">{pct.toFixed(1)}%</span>
              </div>
              <Progress value={pct} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
