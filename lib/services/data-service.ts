import { audioData } from "@/lib/audio-data"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import type { MysterySetKey, PerspectiveType, MysterySet, Mystery, AudioUrlValidation } from "@/types"

class DataService {
  private readonly mysterySetKeys: MysterySetKey[] = ["joyful", "luminous", "sorrowful", "glorious"]

  /**
   * Get mystery set data by index (0-based)
   */
  getMysterySet(index: number): MysterySet | null {
    const key = (index + 1) as keyof typeof rosaryMysteriesDataEn
    return rosaryMysteriesDataEn[key] || null
  }

  /**
   * Get mystery set by key
   */
  getMysterySetByKey(key: MysterySetKey): MysterySet | null {
    const index = this.mysterySetKeys.indexOf(key)
    return index >= 0 ? this.getMysterySet(index) : null
  }

  /**
   * Get all mystery sets
   */
  getAllMysterySets(): MysterySet[] {
    return Object.values(rosaryMysteriesDataEn)
  }

  /**
   * Get mystery set keys in order
   */
  getMysterySetKeys(): MysterySetKey[] {
    return [...this.mysterySetKeys]
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
    return mysterySet?.backgroundImage || "/placeholder.svg"
  }

  /**
   * Get specific mystery from a set
   */
  getMystery(mysterySetIndex: number, mysteryIndex: number): Mystery | null {
    const mysterySet = this.getMysterySet(mysterySetIndex)
    return mysterySet?.mysteries[mysteryIndex] || null
  }

  /**
   * Get audio URL for specific mystery and perspective
   */
  getAudioUrl(mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType): string | null {
    try {
      return audioData[mysterySetKey]?.[mysteryIndex]?.[perspective] || null
    } catch (error) {
      console.error("Error getting audio URL:", error)
      return null
    }
  }

  /**
   * Validate audio URL availability and format
   */
  validateAudioUrl(
    mysterySetKey: MysterySetKey,
    mysteryIndex: number,
    perspective: PerspectiveType,
  ): AudioUrlValidation {
    const url = this.getAudioUrl(mysterySetKey, mysteryIndex, perspective)

    if (!url) {
      return {
        url: "",
        isValid: false,
        errors: ["Audio not available for this selection"],
      }
    }

    // Basic URL validation
    try {
      new URL(url)
      const isValidFormat =
        url.startsWith("https://") && (url.includes(".mp3") || url.includes(".wav") || url.includes(".m4a"))

      if (!isValidFormat) {
        return {
          url,
          isValid: false,
          errors: ["Invalid audio file format"],
        }
      }

      return {
        url,
        isValid: true,
        errors: [],
      }
    } catch {
      return {
        url,
        isValid: false,
        errors: ["Invalid URL format"],
      }
    }
  }

  /**
   * Get available perspectives for a specific mystery
   */
  getAvailablePerspectives(mysterySetKey: MysterySetKey, mysteryIndex: number): PerspectiveType[] {
    const mysteryData = audioData[mysterySetKey]?.[mysteryIndex]
    if (!mysteryData) return []

    const perspectives: PerspectiveType[] = []
    if (mysteryData[3]) perspectives.push(3)
    if (mysteryData[7]) perspectives.push(7)
    if (mysteryData[12]) perspectives.push(12)

    return perspectives
  }

  /**
   * Get all available perspectives (static list)
   */
  getAllPerspectives(): PerspectiveType[] {
    return [3, 7, 12]
  }

  /**
   * Check if mystery set exists by index
   */
  mysterySetExists(index: number): boolean {
    return index >= 0 && index < this.getTotalMysterySets()
  }

  /**
   * Check if audio exists for specific combination
   */
  hasAudio(mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType): boolean {
    const validation = this.validateAudioUrl(mysterySetKey, mysteryIndex, perspective)
    return validation.isValid
  }

  /**
   * Get total number of mystery sets
   */
  getTotalMysterySets(): number {
    return Object.keys(rosaryMysteriesDataEn).length
  }

  /**
   * Get total mysteries in a set
   */
  getTotalMysteriesInSet(mysterySetIndex: number): number {
    const mysterySet = this.getMysterySet(mysterySetIndex)
    return mysterySet?.mysteries.length || 0
  }

  /**
   * Preload audio file for better performance
   */
  async preloadAudio(url: string): Promise<void> {
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
        reject(new Error(`Failed to preload audio: ${url}`))
      }

      audio.addEventListener("canplaythrough", onLoad)
      audio.addEventListener("error", onError)
      audio.src = url
    })
  }

  /**
   * Get mystery set key by index
   */
  getMysterySetKey(index: number): MysterySetKey | null {
    return this.mysterySetKeys[index] || null
  }

  /**
   * Get mystery set index by key
   */
  getMysterySetIndex(key: MysterySetKey): number {
    return this.mysterySetKeys.indexOf(key)
  }
}

// Export singleton instance
export const dataService = new DataService()
