import type {
  AudioData,
  RosaryData,
  MysterySetKey,
  PerspectiveType,
  AudioUrlValidation,
  ValidationResult,
} from "@/types"
import { audioData } from "@/lib/audio-data"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"

class DataService {
  private audioData: AudioData = audioData
  private rosaryData: RosaryData = rosaryMysteriesDataEn

  /**
   * Get audio URL for a specific mystery and perspective
   */
  getAudioUrl(mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType): string | null {
    try {
      const url = this.audioData[mysterySetKey]?.[mysteryIndex]?.[perspective]
      return url || null
    } catch (error) {
      console.error("Error getting audio URL:", error)
      return null
    }
  }

  /**
   * Get rosary data for English (only supported language for now)
   */
  getRosaryData(): RosaryData {
    return this.rosaryData
  }

  /**
   * Get specific mystery set by index
   */
  getMysterySet(mysterySetIndex: number) {
    const data = this.getRosaryData()
    return data[mysterySetIndex + 1] || null
  }

  /**
   * Get all mystery set keys in order
   */
  getMysterySetKeys(): MysterySetKey[] {
    return ["joyful", "luminous", "sorrowful", "glorious"]
  }

  /**
   * Validate audio URL format
   */
  validateAudioUrl(url: string): AudioUrlValidation {
    const errors: string[] = []

    try {
      new URL(url)
    } catch {
      errors.push("Invalid URL format")
    }

    if (!url.startsWith("https://")) {
      errors.push("URL must use HTTPS")
    }

    if (!url.includes(".mp3") && !url.includes(".wav")) {
      errors.push("URL must point to an audio file (.mp3 or .wav)")
    }

    return {
      url,
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Validate all audio URLs in the dataset
   */
  validateAllAudioUrls(): ValidationResult {
    const errors: string[] = []
    const mysterySetKeys = this.getMysterySetKeys()

    for (const setKey of mysterySetKeys) {
      const mysterySet = this.audioData[setKey]
      if (!mysterySet) {
        errors.push(`Missing audio data for mystery set: ${setKey}`)
        continue
      }

      for (let mysteryIndex = 0; mysteryIndex < 5; mysteryIndex++) {
        const mystery = mysterySet[mysteryIndex]
        if (!mystery) {
          errors.push(`Missing audio data for ${setKey} mystery ${mysteryIndex + 1}`)
          continue
        }

        for (const perspective of [3, 7, 12] as PerspectiveType[]) {
          const url = mystery[perspective]
          if (!url) {
            errors.push(`Missing audio URL for ${setKey} mystery ${mysteryIndex + 1}, perspective ${perspective}`)
            continue
          }

          const validation = this.validateAudioUrl(url)
          if (!validation.isValid) {
            errors.push(
              `Invalid URL for ${setKey} mystery ${mysteryIndex + 1}, perspective ${perspective}: ${validation.errors.join(", ")}`,
            )
          }
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Preload audio file
   */
  preloadAudio(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio()

      const cleanup = () => {
        audio.removeEventListener("canplaythrough", onLoad)
        audio.removeEventListener("error", onError)
      }

      const onLoad = () => {
        cleanup()
        resolve()
      }

      const onError = () => {
        cleanup()
        reject(new Error(`Failed to load audio: ${url}`))
      }

      audio.addEventListener("canplaythrough", onLoad)
      audio.addEventListener("error", onError)
      audio.src = url
    })
  }

  /**
   * Get mystery set title by index
   */
  getMysterySetTitle(mysterySetIndex: number): string {
    const mysterySet = this.getMysterySet(mysterySetIndex)
    return mysterySet?.title || ""
  }

  /**
   * Get mystery set background image by index
   */
  getMysterySetBackgroundImage(mysterySetIndex: number): string {
    const mysterySet = this.getMysterySet(mysterySetIndex)
    return mysterySet?.backgroundImage || ""
  }
}

// Export singleton instance
export const dataService = new DataService()

// Validate data on module load in development
if (process.env.NODE_ENV === "development") {
  const validation = dataService.validateAllAudioUrls()
  if (!validation.isValid) {
    console.warn("Audio data validation failed:", validation.errors)
  }
}
