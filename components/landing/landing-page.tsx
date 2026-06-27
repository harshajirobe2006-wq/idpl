import { AboutSection } from "./about"
import { FeaturesSection } from "./features"
import { HeroSection } from "./hero-section"
import { HowItWorksSection } from "./how-it-works"
import { ImportantNoteSection } from "./important-note"
import { LandingFooter } from "./footer"
import { LandingNavbar } from "./navbar"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50/40 transition-colors duration-300 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <LandingNavbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ImportantNoteSection />
        <FeaturesSection />
        <AboutSection />
      </main>
      <LandingFooter />
    </div>
  )
}
