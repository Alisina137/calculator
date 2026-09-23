import type { AppLanguage } from "@/i18n/languages";

export const numeralStyles = [
  { id: "latin", label: "Latin", sample: "123" },
  { id: "persian", label: "Persian", sample: "۱۲۳" },
  { id: "arabic", label: "Arabic-Indic", sample: "١٢٣" },
  { id: "devanagari", label: "Devanagari", sample: "१२३" }
] as const;

export type NumeralStyle = (typeof numeralStyles)[number]["id"];

export function defaultNumeralStyleForLanguage(language: AppLanguage): NumeralStyle {
  if (language === "fa" || language === "ur") return "persian";
  if (language === "ar") return "arabic";
  if (language === "hi") return "devanagari";
  return "latin";
}


export function numeralStylesForLanguage(language: AppLanguage): readonly NumeralStyle[] {
  if (language === "fa" || language === "ur") return ["persian", "latin"];
  if (language === "ar") return ["arabic", "latin"];
  if (language === "hi") return ["devanagari", "latin"];
  return ["latin"];
}

export function numeralStyleOptionsForLanguage(language: AppLanguage) {
  const allowed = new Set<NumeralStyle>(numeralStylesForLanguage(language));
  return numeralStyles.filter((item) => allowed.has(item.id));
}
