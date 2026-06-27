"use client"

import Link from "next/link"
import type { ReactNode } from "react"

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export function ScrollLink({
  sectionId,
  children,
  className,
}: {
  sectionId: string
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(sectionId)}
      className={className}
    >
      {children}
    </button>
  )
}

export function NavLink({
  href,
  sectionId,
  children,
  className,
}: {
  href?: string
  sectionId?: string
  children: ReactNode
  className?: string
}) {
  if (sectionId) {
    return (
      <ScrollLink sectionId={sectionId} className={className}>
        {children}
      </ScrollLink>
    )
  }

  return (
    <Link href={href ?? "/"} className={className}>
      {children}
    </Link>
  )
}
