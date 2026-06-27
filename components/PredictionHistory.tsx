"use client"

import { useCallback, useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  clearPredictionHistory,
  loadPredictionHistory,
  type PredictionHistoryItem,
} from "@/lib/prediction-history"
import { getRipenessDisplay } from "@/lib/ripeness-utils"

interface PredictionHistoryProps {
  refreshKey?: number
}

export function PredictionHistory({ refreshKey = 0 }: PredictionHistoryProps) {
  const [items, setItems] = useState<PredictionHistoryItem[]>([])

  const refresh = useCallback(() => {
    setItems(loadPredictionHistory())
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh, refreshKey])

  const handleClear = () => {
    const confirmed = window.confirm(
      "Clear all prediction history? This action cannot be undone.",
    )
    if (!confirmed) return
    clearPredictionHistory()
    setItems([])
  }

  return (
    <Card className="shadow-lg transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle>History</CardTitle>
          <CardDescription>Recent AI Predictions</CardDescription>
        </div>
        {items.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="shrink-0 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            🗑 Clear History
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No previous predictions yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => {
              const status = getRipenessDisplay(item.prediction)
              const modeLabel = item.mode === "detailed" ? "Detailed" : "Quick"

              return (
                <li
                  key={item.id}
                  className="rounded-2xl border border-emerald-100/80 bg-white/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600 dark:bg-slate-900/60"
                >
                  <div className="flex gap-3">
                    <div className="flex shrink-0 flex-col items-center gap-1">
                      <span className="text-2xl" aria-hidden>{item.fruitEmoji}</span>
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt="Fruit thumbnail"
                          loading="lazy"
                          className="h-14 w-14 rounded-xl border border-emerald-100 object-cover dark:border-slate-600"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 dark:border-slate-600 dark:bg-slate-800" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1.5">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Prediction
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        <span aria-hidden>{status.emoji}</span> {status.label}
                      </p>

                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Confidence
                      </p>
                      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        {(item.confidence * 100).toFixed(1)}%
                      </p>

                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Mode
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-slate-200">
                        {modeLabel}
                      </p>

                      <p className="pt-1 text-xs text-muted-foreground">
                        {item.date}
                        <br />
                        {item.time}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
