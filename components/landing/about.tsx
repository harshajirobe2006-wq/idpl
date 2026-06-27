import { GraduationCap } from "lucide-react"

export function AboutSection() {
  return (
    <section
      id="about"
      className="px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-3xl">
        <article
          className="rounded-2xl border-2 border-emerald-200/80 bg-white/80 p-8 shadow-xl shadow-emerald-50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-100/60 sm:p-10"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <GraduationCap className="size-6" aria-hidden />
            </div>
            <h2 id="about-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Project Information
            </h2>
          </div>
          <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            This AI-based Fruit Ripeness Detection System has been developed as an academic project
            by Batch 119, IDPL, MVJ College of Engineering.
          </p>
        </article>
      </div>
    </section>
  )
}
