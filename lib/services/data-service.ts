import type { AudioData, RosaryData, MysterySetKey, PerspectiveType } from "@/types"
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
   * Get rosary data for English
   */
  getRosaryData(): RosaryData {
    return this.rosaryData
  }

  /**
   * Get specific mystery set by index (0-based)
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

  /**
   * Validate audio URL format
   */
  validateAudioUrl(url: string): boolean {
    try {
      new URL(url)
      return url.startsWith("https://") && (url.includes(".mp3") || url.includes(".wav"))
    } catch {
      return false
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
   * Get all available perspectives for a mystery
   */
  getAvailablePerspectives(): PerspectiveType[] {
    return [3, 7, 12]
  }

  /**
   * Check if audio exists for a specific combination
   */
  hasAudio(mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType): boolean {
    const url = this.getAudioUrl(mysterySetKey, mysteryIndex, perspective)
    return url !== null && this.validateAudioUrl(url)
  }
}

// Export singleton instance
export const dataService = new DataService()
