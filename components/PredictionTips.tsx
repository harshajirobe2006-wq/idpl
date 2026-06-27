import { getRipenessCategory } from "@/lib/ripeness-utils"
import { cn } from "@/lib/utils"

interface PredictionTipsProps {
  ripeness: string
}

const TIPS = {
  ripe: {
    icon: "🟢",
    title: "Ready to Eat",
    tips: [
      "Best time for consumption.",
      "Sweetest flavour.",
      "Ideal for immediate use.",
      "Refrigerate if not consuming today.",
    ],
    cardClass:
      "border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 dark:from-emerald-950/40 dark:via-slate-800 dark:to-emerald-950/20 dark:border-emerald-700/50",
    titleClass: "text-emerald-800 dark:text-emerald-400",
  },
  unripe: {
    icon: "🟡",
    title: "Not Yet Ready",
    tips: [
      "Keep at room temperature.",
      "Avoid refrigeration.",
      "Check again after 1–3 days.",
      "Store away from direct sunlight.",
    ],
    cardClass:
      "border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-yellow-50/50 dark:from-amber-950/30 dark:via-slate-800 dark:to-amber-950/20 dark:border-amber-700/50",
    titleClass: "text-amber-800 dark:text-amber-400",
  },
  overripe: {
    icon: "🔴",
    title: "Consume Soon",
    tips: [
      "Use immediately.",
      "Great for smoothies.",
      "Suitable for desserts.",
      "Avoid long storage.",
    ],
    cardClass:
      "border-red-200/80 bg-gradient-to-br from-red-50 via-white to-orange-50/50 dark:from-red-950/30 dark:via-slate-800 dark:to-red-950/20 dark:border-red-700/50",
    titleClass: "text-red-800 dark:text-red-400",
  },
  unknown: {
    icon: "⚪",
    title: "General Tips",
    tips: [
      "Use a clear, well-lit photo.",
      "Keep one fruit centered in frame.",
      "Try another image for better accuracy.",
    ],
    cardClass:
      "border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 dark:border-slate-600",
    titleClass: "text-slate-800 dark:text-slate-200",
  },
} as const

export function PredictionTips({ ripeness }: PredictionTipsProps) {
  const category = getRipenessCategory(ripeness)
  const content = TIPS[category]

  return (
    <div
      className={cn(
        "animate-fade-in-up rounded-2xl border p-5 shadow-md transition-colors duration-300 sm:p-6",
        content.cardClass,
      )}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Recommendation</h3>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-2xl" aria-hidden>{content.icon}</span>
        <p className={cn("text-base font-bold sm:text-lg", content.titleClass)}>
          {content.title}
        </p>
      </div>
      <ul className="mt-4 space-y-2">
        {content.tips.map((tip) => (
          <li
            key={tip}
            className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300 sm:text-base"
          >
            <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
