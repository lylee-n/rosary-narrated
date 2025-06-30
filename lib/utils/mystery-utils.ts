import { MYSTERY_SET_KEYS } from "@/lib/constants/mystery-sets"

export function getMysterySetKey(index: number): string {
  return MYSTERY_SET_KEYS[index] || ""
}

export function getMysterySetIndex(key: string): number {
  return MYSTERY_SET_KEYS.indexOf(key as any)
}

export function validateMysterySetIndex(index: number): boolean {
  return index >= 0 && index < MYSTERY_SET_KEYS.length
}
