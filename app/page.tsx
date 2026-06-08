import { RipenessDetector } from "@/components/ripeness-detector"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-900">
              Ripeness Detector
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="px-4 py-8">
        <div className="max-w-xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Fruit Ripeness Analysis
            </h1>
            <p className="text-gray-600">
              Upload an image to check ripeness level instantly
            </p>
          </div>

          {/* Detector Component */}
          <RipenessDetector />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 text-center">
        <p className="text-sm text-gray-500">
        </p>
      </footer>
    </main>
  )
}
