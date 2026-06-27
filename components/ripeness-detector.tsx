"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  AlertCircle,
  ImagePlus,
  Loader2,
  Sparkles,
} from "lucide-react"

import { DetailedResults } from "@/components/detector/detailed-results"
import { PredictionModeSelector } from "@/components/detector/prediction-mode-selector"
import { QuickResults } from "@/components/detector/quick-results"
import type { PredictionMode } from "@/components/detector/types"
import { PredictionHistory } from "@/components/PredictionHistory"
import { PredictionTips } from "@/components/PredictionTips"
import { createThumbnail } from "@/lib/create-thumbnail"
import {
  addPredictionHistoryItem,
  formatHistoryDateTime,
} from "@/lib/prediction-history"
import { loadPredictionModel, predictFromImage, type PredictionItem } from "@/lib/predict"
import { getFruitEmoji } from "@/lib/ripeness-utils"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

export function RipenessDetector() {
  const [modelState, setModelState] = useState<
    { status: "loading" } | { status: "ready" } | { status: "error"; message: string }
  >({ status: "loading" })
  const [predictionMode, setPredictionMode] = useState<PredictionMode>("detailed")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<PredictionItem[] | null>(null)
  const [topPrediction, setTopPrediction] = useState<PredictionItem | null>(null)
  const [fruitName, setFruitName] = useState<string | null>(null)
  const [ripeness, setRipeness] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)
  const [isLowConfidence, setIsLowConfidence] = useState(false)
  const [predicting, setPredicting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    loadPredictionModel()
      .then(() => setModelState({ status: "ready" }))
      .catch((err: unknown) => {
        setModelState({
          status: "error",
          message: err instanceof Error ? err.message : "Failed to load model",
        })
      })
  }, [])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleFile = useCallback((file: File | undefined) => {
    setError(null)
    setPredictions(null)
    setTopPrediction(null)
    setFruitName(null)
    setRipeness(null)
    setConfidence(null)
    setIsLowConfidence(false)
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl(null)
      if (file) setError("Please choose an image file.")
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
  }, [])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0])
  }

  const runPrediction = async () => {
    if (modelState.status !== "ready") return
    if (!previewUrl || !imageRef.current) {
      setError("Upload an image first.")
      return
    }

    setPredicting(true)
    setError(null)
    setPredictions(null)
    setTopPrediction(null)
    setFruitName(null)
    setRipeness(null)
    setConfidence(null)
    setIsLowConfidence(false)

    try {
      const img = imageRef.current
      if (!img.complete || img.naturalWidth === 0) {
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject(new Error("Could not load image"))
        })
      }
      const result = await predictFromImage(img)
      setFruitName(result.fruitName)
      setRipeness(result.ripeness)
      setConfidence(result.confidence)
      setIsLowConfidence(result.isLowConfidence)
      setTopPrediction(result.topPrediction)
      setPredictions(result.predictions)

      const thumbnail = await createThumbnail(img)
      const now = new Date()
      const { date, time } = formatHistoryDateTime(now)
      const resolvedFruit = result.fruitName ?? ""
      addPredictionHistoryItem({
        thumbnail,
        prediction: result.ripeness,
        confidence: result.confidence,
        mode: predictionMode,
        date,
        time,
        fruitEmoji: getFruitEmoji(resolvedFruit),
      })
      setHistoryRefreshKey((key) => key + 1)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Prediction failed.")
    } finally {
      setPredicting(false)
    }
  }

  const clearImage = () => {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setPredictions(null)
    setTopPrediction(null)
    setFruitName(null)
    setRipeness(null)
    setConfidence(null)
    setIsLowConfidence(false)
    setError(null)
    resetFileInput()
  }

  const displayFruit = fruitName ?? ""
  const displayRipeness = ripeness ?? "Unknown"
  const fruitEmoji = getFruitEmoji(displayFruit)

  const resultsDescription =
    predictionMode === "detailed"
      ? "Detected fruit type, ripeness stage, and confidence by class."
      : "Your quick ripeness prediction result."

  const emptyResultsMessage =
    predictionMode === "detailed"
      ? "Run prediction to see confidence scores for each class."
      : "Run prediction to see your quick ripeness result."

  const hasPrediction = Boolean(topPrediction)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-4 transition-colors duration-300 sm:p-6 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Card className="overflow-hidden border-emerald-100/80 shadow-lg transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Fruit Ripeness Detector</CardTitle>
          <CardDescription>
            Upload a fruit photo, then detect fruit type and ripeness with your TensorFlow.js model.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {modelState.status === "loading" && (
            <div className="flex items-center gap-3 rounded-lg border bg-muted/40 px-4 py-3 text-sm">
              <Loader2 className="size-4 shrink-0 animate-spin text-primary" aria-hidden />
              <span>Loading model from /model/model.json ...</span>
            </div>
          )}

          {modelState.status === "error" && (
            <div
              className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              role="alert"
            >
              <AlertCircle className="size-4 shrink-0" aria-hidden />
              {modelState.message}
            </div>
          )}

          <PredictionModeSelector value={predictionMode} onChange={setPredictionMode} />

          <div className="flex flex-col gap-2">
            <Label htmlFor="fruit-image">Upload</Label>
            <input
              ref={fileInputRef}
              id="fruit-image"
              type="file"
              accept="image/*"
              className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700"
              onChange={onFileChange}
            />
          </div>

          <div
            className={cn(
              "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-muted/30 transition-all duration-300 dark:bg-slate-900/50",
              previewUrl && "border-solid",
            )}
          >
            {previewUrl ? (
              <img
                ref={imageRef}
                src={previewUrl}
                alt="Selected preview"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 p-8 text-center text-muted-foreground">
                <ImagePlus className="size-10 opacity-60" aria-hidden />
                <p className="text-sm">No image selected</p>
              </div>
            )}
          </div>

          {error && (
            <div
              className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              role="alert"
            >
              <AlertCircle className="size-4 shrink-0" aria-hidden />
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 border-t pt-6">
          <Button
            type="button"
            onClick={runPrediction}
            disabled={
              modelState.status !== "ready" ||
              !previewUrl ||
              predicting
            }
            className="min-w-[10rem] bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {predicting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Running…
              </>
            ) : (
              <>
                <Sparkles className="size-4" aria-hidden />
                Run prediction
              </>
            )}
          </Button>
          <Button type="button" variant="outline" onClick={clearImage} disabled={!previewUrl && !predictions}>
            Clear
          </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>{resultsDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {modelState.status === "loading" && (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          )}

          {modelState.status === "ready" && !predictions && !predicting && (
            <p className="text-sm text-muted-foreground">{emptyResultsMessage}</p>
          )}

          {topPrediction && predictions && predictionMode === "detailed" && (
            <DetailedResults
              topPrediction={topPrediction}
              predictions={predictions}
              fruitEmoji={fruitEmoji}
              displayFruit={displayFruit}
              displayRipeness={displayRipeness}
              confidence={confidence}
              isLowConfidence={isLowConfidence}
            />
          )}

          {topPrediction && predictionMode === "quick" && (
            <QuickResults
              displayRipeness={displayRipeness}
              confidence={confidence}
              probability={topPrediction.probability}
            />
          )}

          {hasPrediction && <PredictionTips ripeness={displayRipeness} />}
        </CardContent>
      </Card>

      <PredictionHistory refreshKey={historyRefreshKey} />
    </div>
  )
}
