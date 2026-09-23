export const supportedLanguages = [
  { id: "en", name: "English", nativeName: "English", rtl: false },
  { id: "fa", name: "Persian", nativeName: "فارسی", rtl: true },
  { id: "ar", name: "Arabic", nativeName: "العربية", rtl: true },
  { id: "es", name: "Spanish", nativeName: "Español", rtl: false },
  { id: "fr", name: "French", nativeName: "Français", rtl: false },
  { id: "de", name: "German", nativeName: "Deutsch", rtl: false },
  { id: "pt", name: "Portuguese", nativeName: "Português", rtl: false },
  { id: "ru", name: "Russian", nativeName: "Русский", rtl: false },
  { id: "zh", name: "Chinese", nativeName: "简体中文", rtl: false },
  { id: "ja", name: "Japanese", nativeName: "日本語", rtl: false },
  { id: "hi", name: "Hindi", nativeName: "हिन्दी", rtl: false },
  { id: "ur", name: "Urdu", nativeName: "اردو", rtl: true },
  { id: "tr", name: "Turkish", nativeName: "Türkçe", rtl: false },
  { id: "it", name: "Italian", nativeName: "Italiano", rtl: false },
  { id: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", rtl: false },
  { id: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", rtl: false },
  { id: "nl", name: "Dutch", nativeName: "Nederlands", rtl: false },
  { id: "pl", name: "Polish", nativeName: "Polski", rtl: false },
  { id: "ro", name: "Romanian", nativeName: "Română", rtl: false },
  { id: "sv", name: "Swedish", nativeName: "Svenska", rtl: false }
] as const;

export type AppLanguage = (typeof supportedLanguages)[number]["id"];

export function isRtlLanguage(language: AppLanguage): boolean {
  return supportedLanguages.find((item) => item.id === language)?.rtl ?? false;
}

export function languageName(language: AppLanguage): string {
  return supportedLanguages.find((item) => item.id === language)?.nativeName ?? "English";
}

export function textDirection(language: AppLanguage): "rtl" | "ltr" {
  return isRtlLanguage(language) ? "rtl" : "ltr";
}

export function textAlignment(language: AppLanguage): "right" | "left" {
  return isRtlLanguage(language) ? "right" : "left";
}

export function rowDirection(language: AppLanguage): "row-reverse" | "row" {
  return isRtlLanguage(language) ? "row-reverse" : "row";
}
