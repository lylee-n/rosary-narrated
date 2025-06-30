import { audioData } from "@/lib/audio-data"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import type { MysterySetKey, PerspectiveType, MysterySet, AudioUrlValidation } from "@/types"

class DataService {
  private readonly mysterySetKeys: MysterySetKey[] = ["joyful", "luminous", "sorrowful", "glorious"]

  /* ─────────────────────────── Mysteries ─────────────────────────── */

  getMysterySet(index: number): MysterySet | null {
    return rosaryMysteriesDataEn[(index + 1) as keyof typeof rosaryMysteriesDataEn] || null
  }

  getAllMysterySets(): MysterySet[] {
    return Object.values(rosaryMysteriesDataEn)
  }

  getMysterySetKeys(): MysterySetKey[] {
    return [...this.mysterySetKeys]
  }

  getMysterySetTitle(index: number): string {
    return this.getMysterySet(index)?.title || "Unknown Mystery Set"
  }

  /* ─────────────────────────── Audio ─────────────────────────── */

  getAudioUrl(mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType): string | null {
    return audioData[mysterySetKey]?.[mysteryIndex]?.[perspective] || null
  }

  validateAudioUrl(
    mysterySetKey: MysterySetKey,
    mysteryIndex: number,
    perspective: PerspectiveType,
  ): AudioUrlValidation {
    const url = this.getAudioUrl(mysterySetKey, mysteryIndex, perspective)
    return url
      ? { url, isValid: true, errors: [] }
      : { url: "", isValid: false, errors: ["Audio not available for this selection"] }
  }

  getAvailablePerspectives(mysterySetKey: MysterySetKey, mysteryIndex: number): PerspectiveType[] {
    const entry = audioData[mysterySetKey]?.[mysteryIndex]
    return (entry ? (Object.keys(entry).map(Number) as PerspectiveType[]) : []).sort()
  }

  /* ─────────────────────────── Helpers ─────────────────────────── */

  mysterySetExists(index: number): boolean {
    return Boolean(this.getMysterySet(index))
  }

  getTotalMysterySets(): number {
    return Object.keys(rosaryMysteriesDataEn).length
  }
}

export const dataService = new DataService()
