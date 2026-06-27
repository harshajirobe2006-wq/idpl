import { AlertCircle } from "lucide-react"

const tips = [
  "Upload images with plain or no background.",
  "Keep only one fruit in the image.",
  "Ensure proper lighting.",
  "Avoid blurry or dark photos.",
  "Keep the fruit centered.",
]

export function ImportantNoteSection() {
  return (
    <section className="px-4 py-8 sm:px-6" aria-labelledby="important-note-heading">
      <div className="mx-auto max-w-4xl">
        <div
          className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-6 shadow-lg shadow-amber-100/50 sm:p-8"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <AlertCircle className="size-5" aria-hidden />
            </div>
            <div>
              <h2
                id="important-note-heading"
                className="text-xl font-bold text-gray-900 sm:text-2xl"
              >
                Important for Best Accuracy
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                This AI model primarily predicts fruit ripeness using colour gradients and colour
                distribution.
              </p>
              <p className="mt-4 text-sm font-semibold text-emerald-800">
                For the highest prediction accuracy:
              </p>
              <ul className="mt-3 space-y-2">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-gray-700 sm:text-base">
                    <span className="text-emerald-600" aria-hidden>✅</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
