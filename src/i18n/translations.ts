import type { AppLanguage } from "@/context/AppPreferencesContext";

const persian = {
  appName: "حساب فارسی",
  calculator: "ماشین حساب",
  tools: "ابزارها",
  history: "تاریخچه",
  settings: "تنظیمات",
  everydayTools: "ابزارهای روزمره",
  percentage: "درصد",
  percentageDesc: "درصد یک عدد، افزایش و کاهش درصدی",
  discount: "تخفیف",
  discountDesc: "قیمت نهایی و میزان صرفه‌جویی",
  unitConverter: "تبدیل واحد",
  unitConverterDesc: "طول، وزن، دما و واحدهای پرکاربرد",
  age: "محاسبه سن",
  ageDesc: "سن دقیق با تاریخ شمسی یا میلادی",
  date: "محاسبه تاریخ",
  dateDesc: "فاصله بین تاریخ‌ها و افزودن یا کم کردن زمان",
  historyEmptyTitle: "هنوز محاسبه‌ای ذخیره نشده",
  historyEmptyBody: "پس از نهایی کردن محاسبه‌ها، آن‌ها اینجا نمایش داده می‌شوند.",
  language: "زبان",
  numerals: "نوع اعداد",
  appearance: "ظاهر",
  haptics: "بازخورد لمسی",
  system: "سیستم",
  light: "روشن",
  dark: "تیره",
  persian: "فارسی",
  dari: "دری",
  persianDigits: "اعداد فارسی ۱۲۳",
  latinDigits: "اعداد لاتین 123",
  privacy: "حریم خصوصی",
  privacyBody: "محاسبات اصلی روی دستگاه انجام می‌شوند و برای استفاده عادی حساب کاربری لازم نیست."
} as const;

const dari: Record<keyof typeof persian, string> = {
  ...persian,
  appName: "حساب دری",
  percentage: "فیصدی",
  percentageDesc: "فیصدی یک عدد، افزایش و کاهش فیصدی",
  ageDesc: "سن دقیق با تاریخ هجری شمسی یا میلادی",
  historyEmptyBody: "پس از نهایی‌کردن محاسبه‌ها، آن‌ها در این بخش نشان داده می‌شوند.",
  appearance: "نمایش",
  privacy: "محرمیت",
  privacyBody: "محاسبات اصلی در دستگاه انجام می‌شوند و برای استفاده عادی حساب کاربری لازم نیست."
};

export type TranslationKey = keyof typeof persian;

export function t(language: AppLanguage, key: TranslationKey): string {
  return language === "dari" ? dari[key] : persian[key];
}
