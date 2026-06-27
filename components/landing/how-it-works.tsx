const steps = [
  {
    icon: "📷",
    title: "Upload Image",
    description: "Upload a clear image of a fruit.",
  },
  {
    icon: "🤖",
    title: "AI Analysis",
    description:
      "Our TensorFlow.js AI model detects ripeness by analyzing the fruit's colour distribution, colour gradients and visual patterns.",
  },
  {
    icon: "📈",
    title: "Instant Result",
    description: "Receive ripeness prediction with confidence percentage in seconds.",
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            How Our AI Works
          </h2>
          <p className="mt-3 text-gray-600">Three simple steps from photo to prediction</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="landing-card group rounded-2xl border border-emerald-100/80 bg-white/80 p-6 shadow-lg shadow-emerald-50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/80"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-amber-100 text-3xl shadow-inner">
                <span aria-hidden>{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
