"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"

import { NavLink } from "./scroll-link"

const navItems = [
  { label: "Home", sectionId: "hero" },
  { label: "How it Works", sectionId: "how-it-works" },
  { label: "Features", sectionId: "features" },
  { label: "About", sectionId: "about" },
]

export function LandingNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/60 bg-white/75 backdrop-blur-xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/85">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-emerald-800 transition-opacity hover:opacity-80 dark:text-emerald-400"
        >
          <span aria-hidden>🍃</span>
          <span className="hidden sm:inline">Fruit Ripeness Detector</span>
          <span className="sm:hidden">Fruit AI</span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              sectionId={item.sectionId}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
          <Button
            asChild
            className="bg-emerald-600 text-white shadow-md shadow-emerald-200/50 transition-transform hover:scale-105 hover:bg-emerald-700"
          >
            <Link href="/detect">Start Detection</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-lg p-2 text-gray-700 dark:text-slate-300"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "border-t border-emerald-100/60 bg-white/95 px-4 py-4 dark:border-slate-700 dark:bg-slate-900/95 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex flex-col gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              sectionId={item.sectionId}
              className="rounded-lg px-2 py-2 text-left text-sm font-medium text-gray-700 hover:bg-emerald-50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {item.label}
            </NavLink>
          ))}
          <Button asChild className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
            <Link href="/detect">Start Detection</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
