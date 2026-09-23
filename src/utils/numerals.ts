import type { NumeralStyle } from "@/i18n/numeralStyles";

const latin = "0123456789";
const digitSets: Record<NumeralStyle, string> = {
  latin,
  persian: "۰۱۲۳۴۵۶۷۸۹",
  arabic: "٠١٢٣٤٥٦٧٨٩",
  devanagari: "०१२३४५६७८९"
};

const localizedDecimal = new Set(["٫"]);
const localizedGroup = new Set(["٬"]);

export function normalizeDigits(input: string): string {
  return [...input]
    .map((character) => {
      for (const digits of Object.values(digitSets)) {
        const index = digits.indexOf(character);
        if (index >= 0) return latin[index];
      }

      if (localizedDecimal.has(character)) return ".";
      if (localizedGroup.has(character)) return ",";

      return character;
    })
    .join("");
}

export function displayDigits(input: string, style: NumeralStyle): string {
  const normalized = normalizeDigits(input);
  if (style === "latin") return normalized;

  const target = digitSets[style];

  return [...normalized]
    .map((character) => {
      const index = latin.indexOf(character);
      if (index >= 0) return target[index];

      if ((style === "persian" || style === "arabic") && character === ".") {
        return "٫";
      }
      if ((style === "persian" || style === "arabic") && character === ",") {
        return "٬";
      }

      return character;
    })
    .join("");
}
