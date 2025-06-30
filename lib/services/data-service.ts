import { audioData } from "@/lib/audio-data"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import type { MysterySetKey, PerspectiveType, MysterySet, AudioUrlValidation } from "@/types"

class DataService {
  private readonly mysterySetKeys: MysterySetKey[] = ["joyful", "luminous", "sorrowful", "glorious"]

  /**
   * Get mystery set data by index
   */
  getMysterySet(index: number): MysterySet | null {
    const mysterySetData = rosaryMysteriesDataEn[(index + 1) as keyof typeof rosaryMysteriesDataEn]
    return mysterySetData || null
  }

  /**
   * Get all mystery sets
   */
  getAllMysterySets(): MysterySet[] {
    return Object.values(rosaryMysteriesDataEn)
  }

  /**
   * Get mystery set keys
   */
  getMysterySetKeys(): MysterySetKey[] {
    return [...this.mysterySetKeys]
  }

  /**
   * Get audio URL for specific mystery and perspective
   */
  getAudioUrl(mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType): string | null {
    return audioData[mysterySetKey]?.[mysteryIndex]?.[perspective] || null
  }

  /**
   * Validate audio URL availability
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

    return {
      url,
      isValid: true,
      errors: [],
    }
  }

  /**
   * Get available perspectives for a mystery
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
   * Check if mystery set exists
   */
  mysterySetExists(index: number): boolean {
    return !!rosaryMysteriesDataEn[(index + 1) as keyof typeof rosaryMysteriesDataEn]
  }

  /**
   * Get mystery set title by index
   */
  getMysterySetTitle(index: number): string {
    const mysterySet = this.getMysterySet(index)
    return mysterySet?.title || "Unknown Mystery Set"
  }

  /**
   * Get total number of mystery sets
   */
  getTotalMysterySets(): number {
    return Object.keys(rosaryMysteriesDataEn).length
  }
}

export const dataService = new DataService()
