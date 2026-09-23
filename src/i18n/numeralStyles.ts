import type { AppLanguage } from "@/i18n/languages";

export const numeralStyles = [
  { id: "latin", label: "Latin", sample: "123" },
  { id: "persian", label: "Persian", sample: "۱۲۳" },
  { id: "arabic", label: "Arabic-Indic", sample: "١٢٣" },
  { id: "devanagari", label: "Devanagari", sample: "१२३" },
  { id: "bengali", label: "Bengali", sample: "১২৩" },
  { id: "thai", label: "Thai", sample: "๑๒๓" }
] as const;

export type NumeralStyle = (typeof numeralStyles)[number]["id"];

export function defaultNumeralStyleForLanguage(language: AppLanguage): NumeralStyle {
  if (language === "fa" || language === "ur") return "persian";
  if (language === "ar") return "arabic";
  if (language === "hi") return "devanagari";
  if (language === "bn") return "bengali";
  if (language === "th") return "thai";
  return "latin";
}
