import { getRipenessDisplay } from "@/lib/ripeness-utils"

interface QuickResultsProps {
  displayRipeness: string
  confidence: number | null
  probability: number
}

export function QuickResults({ displayRipeness, confidence, probability }: QuickResultsProps) {
  const status = getRipenessDisplay(displayRipeness)
  const confidencePct = ((confidence ?? probability) * 100).toFixed(1)

  return (
    <div
      className="animate-fade-in-up rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 shadow-lg shadow-emerald-100/50 transition-colors duration-300 sm:p-8 dark:border-emerald-800/50 dark:from-emerald-950/30 dark:via-slate-800 dark:to-slate-900 dark:shadow-emerald-900/20"
    >
      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
        <span className="text-xl" aria-hidden>✔</span>
        <p className="text-sm font-semibold uppercase tracking-wide">Prediction Complete</p>
      </div>

      <p className="mt-6 text-sm font-medium text-gray-600 dark:text-slate-400">Fruit Status</p>

      <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        <span aria-hidden>{status.emoji}</span> {status.label}
      </p>

      <div className="mt-6 rounded-xl border border-emerald-100 bg-white/80 px-4 py-3 backdrop-blur-sm dark:border-slate-600 dark:bg-slate-900/60">
        <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Confidence</p>
        <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
          {confidencePct}%
        </p>
      </div>
    </div>
  )
}
