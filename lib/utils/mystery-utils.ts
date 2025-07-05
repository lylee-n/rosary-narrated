import type { MysterySetKey } from "@/lib/types"
import { MYSTERY_SET_KEYS } from "@/lib/constants/mystery-sets"

/**
 * Get mystery set key by index
 * @param index 0-based index (0=joyful, 1=luminous, 2=sorrowful, 3=glorious)
 * @returns Mystery set key
 */
export function getMysterySetKey(index: number): MysterySetKey {
  if (index < 0 || index >= MYSTERY_SET_KEYS.length) {
    // Invalid mystery set index, defaulting to 'joyful'
    return "joyful"
  }
  return MYSTERY_SET_KEYS[index]
}

/**
 * Get mystery set index by key
 * @param key Mystery set key
 * @returns 0-based index
 */
export function getMysterySetIndex(key: MysterySetKey): number {
  const index = MYSTERY_SET_KEYS.indexOf(key)
  return index === -1 ? 0 : index
}

/**
 * Get all mystery set keys
 * @returns Array of all mystery set keys
 */
export function getAllMysterySetKeys(): readonly MysterySetKey[] {
  return MYSTERY_SET_KEYS
}

/**
 * Validate if a mystery set key is valid
 * @param key Key to validate
 * @returns True if valid
 */
export function isValidMysterySetKey(key: string): key is MysterySetKey {
  return MYSTERY_SET_KEYS.includes(key as MysterySetKey)
}

/**
 * Format mystery set key for display
 * @param key Mystery set key
 * @returns Formatted display name
 */
export function formatMysterySetName(key: MysterySetKey): string {
  const names: Record<MysterySetKey, string> = {
    joyful: "Joyful Mysteries",
    luminous: "Luminous Mysteries",
    sorrowful: "Sorrowful Mysteries",
    glorious: "Glorious Mysteries",
  }
  return names[key] || key
}
