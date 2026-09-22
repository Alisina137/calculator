import type { NumeralStyle } from "@/context/AppPreferencesContext";

const latin = "0123456789";
const persian = "۰۱۲۳۴۵۶۷۸۹";
const arabicIndic = "٠١٢٣٤٥٦٧٨٩";

export function normalizeDigits(input: string): string {
  return [...input]
    .map((character) => {
      const persianIndex = persian.indexOf(character);
      if (persianIndex >= 0) return latin[persianIndex];
      const arabicIndex = arabicIndic.indexOf(character);
      if (arabicIndex >= 0) return latin[arabicIndex];
      return character;
    })
    .join("");
}

export function displayDigits(input: string, style: NumeralStyle): string {
  const normalized = normalizeDigits(input);
  if (style === "latin") return normalized;

  return [...normalized]
    .map((character) => {
      const index = latin.indexOf(character);
      return index >= 0 ? persian[index] : character;
    })
    .join("");
}
