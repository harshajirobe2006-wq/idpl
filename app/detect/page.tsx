import Link from "next/link"

import { RipenessDetector } from "@/components/ripeness-detector"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function DetectPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white transition-colors duration-300 dark:from-slate-900 dark:to-slate-900">
      <header className="sticky top-0 z-10 w-full border-b border-gray-100 bg-white/80 px-4 py-4 backdrop-blur-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/85">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Ripeness Detector
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Fruit Ripeness Analysis
            </h1>
            <p className="text-gray-600 dark:text-slate-400">
              Upload an image to check ripeness level instantly
            </p>
          </div>
          <RipenessDetector />
        </div>
      </section>

      <footer className="px-4 py-6 text-center">
        <p className="text-sm text-gray-500 dark:text-slate-500" />
      </footer>
    </main>
  )
}
