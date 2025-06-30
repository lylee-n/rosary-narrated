import type { RosaryData, PerspectiveType } from "@/types"
import { audioData } from "@/lib/audio-data"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"

class DataService {
  private mysterySetKeys = ["joyful", "luminous", "sorrowful", "glorious"]

  /**
   * Get audio URL for a specific mystery and perspective
   */
  getAudioUrl(mysterySetKey: string, mysteryIndex: number, perspective: 3 | 7 | 12): string | null {
    return audioData[mysterySetKey as keyof typeof audioData]?.[mysteryIndex]?.[perspective] || null
  }

  /**
   * Get rosary data for English
   */
  getRosaryData(): RosaryData {
    return rosaryMysteriesDataEn
  }

  /**
   * Get specific mystery set by index (0-based)
   */
  getMysterySet(index: number) {
    const key = (index + 1) as keyof typeof rosaryMysteriesDataEn
    return rosaryMysteriesDataEn[key] || null
  }

  /**
   * Get all mystery set keys in order
   */
  getMysterySetKeys(): string[] {
    return this.mysterySetKeys
  }

  /**
   * Get mystery set title by index
   */
  getMysterySetTitle(index: number): string {
    const mysterySet = this.getMysterySet(index)
    return mysterySet?.title || "Unknown Mystery Set"
  }

  /**
   * Get mystery set background image by index
   */
  getMysterySetBackgroundImage(index: number): string {
    const mysterySet = this.getMysterySet(index)
    return mysterySet?.backgroundImage || ""
  }

  /**
   * Validate audio URL format
   */
  validateAudioUrl(url: string): boolean {
    return url && url.length > 0
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
  hasAudio(mysterySetKey: string, mysteryIndex: number, perspective: 3 | 7 | 12): boolean {
    const url = this.getAudioUrl(mysterySetKey, mysteryIndex, perspective)
    return url !== null && this.validateAudioUrl(url)
  }

  /**
   * Placeholder methods for future functionality
   */
  joinGame(gameId: string, playerName: string): Promise<{ success: boolean; message?: string }> {
    return Promise.resolve({ success: false, message: "Game functionality not implemented yet." })
  }
}

// Export singleton instance
export const dataService = new DataService()
