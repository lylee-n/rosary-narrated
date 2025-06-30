import type { MysterySetKey } from "@/types"

export const MYSTERY_SET_KEYS: MysterySetKey[] = ["joyful", "luminous", "sorrowful", "glorious"]

export function getMysterySetKey(index: number): MysterySetKey | null {
  return MYSTERY_SET_KEYS[index] || null
}

export function getMysterySetIndex(key: MysterySetKey): number {
  return MYSTERY_SET_KEYS.indexOf(key)
}

export function isValidMysterySetIndex(index: number): boolean {
  return index >= 0 && index < MYSTERY_SET_KEYS.length
}

export function getNextMysterySetIndex(currentIndex: number): number {
  return (currentIndex + 1) % MYSTERY_SET_KEYS.length
}

export function getPreviousMysterySetIndex(currentIndex: number): number {
  return currentIndex === 0 ? MYSTERY_SET_KEYS.length - 1 : currentIndex - 1
}
