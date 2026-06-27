export type RipenessCategory = "ripe" | "unripe" | "overripe" | "unknown"

export function getRipenessCategory(ripeness: string): RipenessCategory {
  const normalized = ripeness.toLowerCase()

  if (normalized.includes("unripe")) return "unripe"
  if (normalized.includes("over")) return "overripe"
  if (normalized.includes("ripe")) return "ripe"

  return "unknown"
}

export function getRipenessDisplay(ripeness: string): { emoji: string; label: string } {
  const category = getRipenessCategory(ripeness)

  switch (category) {
    case "ripe":
      return { emoji: "🟢", label: "RIPE" }
    case "unripe":
      return { emoji: "🟡", label: "UNRIPE" }
    case "overripe":
      return { emoji: "🔴", label: "OVERRIPE" }
    default:
      return { emoji: "⚪", label: ripeness.toUpperCase() }
  }
}

export function getFruitEmoji(fruitName: string): string {
  const key = fruitName.toLowerCase()
  if (key.includes("banana")) return "🍌"
  if (key.includes("apple")) return "🍎"
  if (key.includes("mango")) return "🥭"
  if (key.includes("orange")) return "🍊"
  if (key.includes("grape")) return "🍇"
  if (key.includes("pineapple")) return "🍍"
  return "🥭"
}
