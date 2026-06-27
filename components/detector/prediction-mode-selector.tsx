"use client"

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

import { PREDICTION_MODES, type PredictionMode } from "./types"

interface PredictionModeSelectorProps {
  value: PredictionMode
  onChange: (mode: PredictionMode) => void
}

export function PredictionModeSelector({ value, onChange }: PredictionModeSelectorProps) {
  return (
    <div
      className="rounded-2xl border border-emerald-100/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-colors duration-300 sm:p-5 dark:border-slate-600 dark:bg-slate-800/80"
      role="radiogroup"
      aria-label="Prediction mode"
    >
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">Prediction Mode</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">Choose how you would like to view AI results.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PREDICTION_MODES.map((mode) => {
          const selected = value === mode.value

          return (
            <button
              key={mode.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(mode.value)}
              className={cn(
                "group relative rounded-xl border-2 p-4 text-left transition-all duration-300",
                "hover:-translate-y-0.5 hover:shadow-md",
                selected
                  ? "border-emerald-500 bg-emerald-50/80 shadow-md shadow-emerald-100/60 dark:bg-emerald-950/40 dark:shadow-emerald-900/30"
                  : "border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30 dark:border-slate-600 dark:bg-slate-900/50 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/20",
              )}
            >
              {selected && (
                <span
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white"
                  aria-hidden
                >
                  <Check className="size-3.5" />
                </span>
              )}

              <span className="text-2xl" aria-hidden>{mode.icon}</span>
              <p className="mt-2 font-semibold text-gray-900 dark:text-white">{mode.title}</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">{mode.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
