import type { RosaryMysterySet, AudioData, MysteryImage } from "@/lib/types"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import { audioDataEn } from "@/lib/audio-data"
import { MYSTERY_IMAGES } from "@/constants"

class DataService {
  private mysterySets: RosaryMysterySet[]
  private audioData: AudioData[]
  private mysteryImages: MysteryImage[]

  constructor() {
    // For now, we only load English data as per the plan.
    this.mysterySets = Object.values(rosaryMysteriesDataEn)
    this.audioData = audioDataEn
    this.mysteryImages = MYSTERY_IMAGES.map((src, index) => ({
      src,
      alt: this.getMysterySetTitle(index),
    }))
  }

  /**
   * Retrieves all rosary mystery sets.
   * @returns An array of RosaryMysterySet objects.
   */
  getMysterySets(): RosaryMysterySet[] {
    return this.mysterySets
  }

  /**
   * Retrieves a specific mystery set by its index.
   * @param index The index of the mystery set.
   * @returns The RosaryMysterySet object, or undefined if not found.
   */
  getMysterySet(index: number): RosaryMysterySet | undefined {
    return this.mysterySets[index]
  }

  /**
   * Retrieves the title of a specific mystery set by its index.
   * @param index The index of the mystery set.
   * @returns The title of the mystery set, or a default string if not found.
   */
  getMysterySetTitle(index: number): string {
    return this.mysterySets[index]?.title || "Unknown Mystery Set"
  }

  /**
   * Retrieves the audio URL for a given audio ID.
   * This method simulates fetching the audio URL from a backend or CDN.
   * In a real application, this might involve an API call.
   * @param audioId The ID of the audio file (e.g., "joyful-1-intro").
   * @returns A Promise that resolves with the audio URL string, or null if not found.
   */
  async getAudioUrl(audioId: string): Promise<string | null> {
    const audioItem = this.audioData.find((item) => item.id === audioId)
    if (audioItem) {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 100))
      return audioItem.url
    }
    console.warn(`Audio URL not found for ID: ${audioId}`)
    return null
  }

  /**
   * Preloads audio URLs for a given mystery set to improve playback experience.
   * @param mysterySetIndex The index of the mystery set to preload audio for.
   */
  async preloadAudioForMysterySet(mysterySetIndex: number): Promise<void> {
    const mysterySet = this.getMysterySet(mysterySetIndex)
    if (!mysterySet) {
      console.warn(`Mystery set at index ${mysterySetIndex} not found for preloading.`)
      return
    }

    const audioPromises: Promise<void>[] = []
    mysterySet.mysteries.forEach((mystery) => {
      mystery.decades.forEach((decade) => {
        if (decade.audioId) {
          audioPromises.push(
            this.getAudioUrl(decade.audioId).then((url) => {
              if (url) {
                // Optionally, create an Audio object to trigger browser caching
                const audio = new Audio(url)
                audio.preload = "auto"
                audio.load()
              }
            }),
          )
        }
      })
    })

    try {
      await Promise.all(audioPromises)
      console.log(`Audio preloaded for mystery set ${mysterySet.title}`)
    } catch (error) {
      console.error(`Failed to preload audio for mystery set ${mysterySet.title}:`, error)
    }
  }

  /**
   * Retrieves all mystery images.
   * @returns An array of MysteryImage objects.
   */
  getMysteryImages(): MysteryImage[] {
    return this.mysteryImages
  }
}

export const dataService = new DataService()
