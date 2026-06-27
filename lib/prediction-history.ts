import type { PredictionMode } from "@/components/detector/types"

export const HISTORY_STORAGE_KEY = "fruit-ripeness-prediction-history"
export const MAX_HISTORY_ITEMS = 10

export interface PredictionHistoryItem {
  id: string
  thumbnail: string
  prediction: string
  confidence: number
  mode: PredictionMode
  date: string
  time: string
  timestamp: number
  fruitEmoji: string
}

export function formatHistoryDateTime(date: Date): { date: string; time: string } {
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return { date: formattedDate, time: formattedTime }
}

export function loadPredictionHistory(): PredictionHistoryItem[] {
  if (typeof window === "undefined") return []

  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw) as PredictionHistoryItem[]
    if (!Array.isArray(parsed)) return []

    return parsed
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, MAX_HISTORY_ITEMS)
  } catch {
    return []
  }
}

export function savePredictionHistory(items: PredictionHistoryItem[]): void {
  localStorage.setItem(
    HISTORY_STORAGE_KEY,
    JSON.stringify(items.slice(0, MAX_HISTORY_ITEMS)),
  )
}

export function addPredictionHistoryItem(
  item: Omit<PredictionHistoryItem, "id" | "timestamp"> & { timestamp?: number },
): PredictionHistoryItem[] {
  const timestamp = item.timestamp ?? Date.now()
  const entry: PredictionHistoryItem = {
    ...item,
    id: `${timestamp}-${Math.random().toString(36).slice(2, 9)}`,
    timestamp,
  }

  const updated = [entry, ...loadPredictionHistory()].slice(0, MAX_HISTORY_ITEMS)
  savePredictionHistory(updated)
  return updated
}

export function clearPredictionHistory(): void {
  localStorage.removeItem(HISTORY_STORAGE_KEY)
}
