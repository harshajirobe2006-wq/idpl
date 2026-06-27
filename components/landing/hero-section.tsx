"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { ScrollLink } from "./scroll-link"

const floatingFruits = [
  { emoji: "🍌", className: "top-8 left-6 animate-float-delay-1", size: "text-6xl" },
  { emoji: "🍎", className: "top-16 right-8 animate-float-delay-2", size: "text-5xl" },
  { emoji: "🥭", className: "bottom-20 left-10 animate-float-delay-3", size: "text-5xl" },
  { emoji: "🍊", className: "bottom-10 right-14 animate-float-delay-4", size: "text-4xl" },
  { emoji: "🍇", className: "top-1/2 right-4 animate-float-delay-2", size: "text-3xl" },
]

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:py-28"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -right-20 top-32 h-80 w-80 rounded-full bg-amber-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-100/60 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="animate-fade-in-up space-y-6">
          <p className="inline-flex items-center rounded-full border border-emerald-200/80 bg-white/70 px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur-sm">
            AI · TensorFlow.js · Instant Analysis
          </p>

          <h1
            id="hero-heading"
            className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            AI Powered{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              Fruit Ripeness
            </span>{" "}
            Detection
          </h1>

          <p className="text-xl font-semibold text-emerald-800 sm:text-2xl">
            Know the perfect harvesting stage in seconds using Artificial Intelligence.
          </p>

          <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Upload a fruit image and let our AI analyze its ripeness instantly with high
            confidence.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 px-8 text-white shadow-lg shadow-emerald-200/60 transition-transform hover:scale-105 hover:bg-emerald-700"
            >
              <Link href="/detect">Start Detection</Link>
            </Button>
            <ScrollLink
              sectionId="how-it-works"
              className="inline-flex h-10 items-center justify-center rounded-md border border-emerald-200 bg-white/80 px-8 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur-sm transition-transform hover:scale-105 hover:bg-emerald-50"
            >
              Learn More
            </ScrollLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-in-up lg:max-w-lg">
          <div className="relative aspect-square rounded-3xl border border-white/60 bg-white/40 p-8 shadow-2xl shadow-emerald-100/80 backdrop-blur-md">
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
            <div className="relative flex h-full items-center justify-center">
              <div className="relative h-full w-full">
                {floatingFruits.map((fruit) => (
                  <span
                    key={fruit.emoji}
                    className={`absolute ${fruit.className} ${fruit.size} drop-shadow-md select-none`}
                    aria-hidden
                  >
                    {fruit.emoji}
                  </span>
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl border border-emerald-100 bg-white/80 px-6 py-5 text-center shadow-lg backdrop-blur-sm">
                    <p className="text-sm font-medium text-emerald-700">Smart Vision AI</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">Ripeness Score</p>
                    <p className="mt-2 text-3xl font-extrabold text-emerald-600">96%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
