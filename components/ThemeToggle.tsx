"use client"

import { cn } from "@/lib/utils"

import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <div className="h-9 w-[7.5rem] rounded-lg border border-emerald-200/60 bg-white/80 dark:border-slate-600 dark:bg-slate-800" />
    )
  }

  return (
    <div
      className="flex rounded-lg border border-emerald-200/80 bg-white/90 p-0.5 shadow-sm transition-colors duration-300 dark:border-slate-600 dark:bg-slate-800"
      role="group"
      aria-label="Theme selection"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={cn(
          "rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all duration-300 sm:text-sm",
          theme === "light"
            ? "bg-emerald-600 text-white shadow-sm"
            : "text-gray-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400",
        )}
        aria-pressed={theme === "light"}
      >
        ☀ Light
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={cn(
          "rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all duration-300 sm:text-sm",
          theme === "dark"
            ? "bg-emerald-600 text-white shadow-sm"
            : "text-gray-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400",
        )}
        aria-pressed={theme === "dark"}
      >
        🌙 Dark
      </button>
    </div>
  )
}
