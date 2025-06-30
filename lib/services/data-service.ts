import type { AudioData, RosaryData, MysterySetKey, PerspectiveType, Language } from "@/types"
import { audioData } from "@/lib/audio-data"
import { audioDataVi } from "@/lib/audio-data-vi"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"

class DataService {
  private audioDataMap: Record<Language, AudioData> = {
    en: audioData,
    vi: audioDataVi,
  }

  private rosaryDataMap: Record<Language, RosaryData> = {
    en: rosaryMysteriesDataEn,
    vi: rosaryMysteriesDataEn, // TODO: Add Vietnamese rosary data
  }

  getAudioUrl(
    language: Language,
    mysterySetKey: MysterySetKey,
    mysteryIndex: number,
    perspective: PerspectiveType,
  ): string | null {
    try {
      return this.audioDataMap[language]?.[mysterySetKey]?.[mysteryIndex]?.[perspective] || null
    } catch (error) {
      console.error("Error getting audio URL:", error)
      return null
    }
  }

  getRosaryData(language: Language): RosaryData {
    return this.rosaryDataMap[language] || this.rosaryDataMap.en
  }

  getMysterySet(language: Language, mysterySetIndex: number) {
    const data = this.getRosaryData(language)
    return data[mysterySetIndex + 1] || null
  }

  validateAudioUrl(url: string): boolean {
    try {
      new URL(url)
      return url.startsWith("https://") && (url.includes(".mp3") || url.includes(".wav"))
    } catch {
      return false
    }
  }

  preloadAudio(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio()
      audio.oncanplaythrough = () => resolve()
      audio.onerror = () => reject(new Error(`Failed to load audio: ${url}`))
      audio.src = url
    })
  }
}

export const dataService = new DataService()
