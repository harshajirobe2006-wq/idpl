const features = [
  {
    icon: "⚡",
    title: "Fast Prediction",
    description: "AI gives results within seconds.",
  },
  {
    icon: "🎯",
    title: "High Confidence",
    description: "Displays prediction confidence percentage.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    description: "Works on desktop and mobile devices.",
  },
  {
    icon: "🧠",
    title: "AI Powered",
    description: "Powered using TensorFlow.js Deep Learning model.",
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Features
          </h2>
          <p className="mt-3 text-gray-600">Built for speed, accuracy, and ease of use</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="landing-card rounded-2xl border border-white/80 bg-white/70 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/60"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-3xl" aria-hidden>{feature.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
