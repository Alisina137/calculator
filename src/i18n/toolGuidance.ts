import type { AppLanguage } from "@/i18n/languages";

export type ToolGuideId = "percentage" | "discount" | "unit" | "age" | "date";

export type ToolGuide = {
  purpose: string;
  inputs: string[];
  result: string;
};

const en: Record<ToolGuideId, ToolGuide> = {
  percentage: {
    purpose: "Calculate a percent of a number, compare two values, or measure percentage increase and decrease.",
    inputs: ["Choose the calculation type.", "Enter the first value.", "Enter the base, total, or new value in the second field."],
    result: "You get the percentage result and, when relevant, the increase or decrease amount."
  },
  discount: {
    purpose: "Calculate the price after a discount and how much you save.",
    inputs: ["Enter the original price.", "Enter a discount from 0 to 100.", "Enter the quantity, or keep it at 1 for one item."],
    result: "You get the discount amount, final price, total, and total savings."
  },
  unit: {
    purpose: "Convert a value from one unit to another.",
    inputs: ["Choose a unit category.", "Enter the amount to convert.", "Choose the source unit and destination unit."],
    result: "The converted value appears in the destination unit."
  },
  age: {
    purpose: "Calculate exact age using the Jalali or Gregorian calendar.",
    inputs: ["Choose the calendar.", "Enter or pick the birth date.", "Enter or pick the calculation date."],
    result: "You get the exact age, total days lived, and time until the next birthday."
  },
  date: {
    purpose: "Calculate the difference between two dates or add/subtract time from a date.",
    inputs: ["Choose the operation and calendar.", "For difference mode, enter two dates.", "For date arithmetic, enter a start date, amount, unit, and operation."],
    result: "You get the exact difference or the calculated final date."
  }
};

const fa: Record<ToolGuideId, ToolGuide> = {
  percentage: {
    purpose: "برای محاسبه درصد یک عدد، نسبت دو عدد، یا میزان افزایش و کاهش درصدی استفاده می‌شود.",
    inputs: ["ابتدا نوع محاسبه را انتخاب کنید.", "در کادر اول مقدار اول را وارد کنید.", "در کادر دوم مقدار پایه، کل، یا مقدار جدید را وارد کنید."],
    result: "نتیجه درصد و در صورت نیاز مقدار افزایش یا کاهش نمایش داده می‌شود."
  },
  discount: {
    purpose: "برای محاسبه قیمت بعد از تخفیف و مقدار صرفه‌جویی استفاده می‌شود.",
    inputs: ["قیمت اصلی را وارد کنید.", "درصد تخفیف را بین ۰ تا ۱۰۰ وارد کنید.", "تعداد کالا را وارد کنید؛ برای یک مورد مقدار ۱ را نگه دارید."],
    result: "مقدار تخفیف، قیمت نهایی، جمع کل و کل صرفه‌جویی نمایش داده می‌شود."
  },
  unit: {
    purpose: "برای تبدیل یک مقدار از یک واحد به واحد دیگر استفاده می‌شود.",
    inputs: ["دسته واحد را انتخاب کنید.", "مقداری که می‌خواهید تبدیل شود را وارد کنید.", "واحد مبدا و سپس واحد مقصد را انتخاب کنید."],
    result: "مقدار تبدیل‌شده در واحد مقصد نمایش داده می‌شود."
  },
  age: {
    purpose: "برای محاسبه سن دقیق با تقویم هجری شمسی یا میلادی استفاده می‌شود.",
    inputs: ["نوع تقویم را انتخاب کنید.", "تاریخ تولد را وارد کنید یا از تقویم انتخاب کنید.", "تاریخ محاسبه را وارد یا انتخاب کنید."],
    result: "سن دقیق، مجموع روزهای زندگی و زمان باقی‌مانده تا تولد بعدی نمایش داده می‌شود."
  },
  date: {
    purpose: "برای محاسبه فاصله بین دو تاریخ یا افزودن و کم‌کردن زمان از یک تاریخ استفاده می‌شود.",
    inputs: ["نوع عملیات و تقویم را انتخاب کنید.", "در حالت فاصله، تاریخ اول و دوم را وارد کنید.", "در حالت افزودن/کم‌کردن، تاریخ شروع، مقدار، واحد زمان و عملیات را انتخاب کنید."],
    result: "فاصله دقیق یا تاریخ نهایی محاسبه‌شده نمایش داده می‌شود."
  }
};

export function toolGuidance(language: AppLanguage, id: ToolGuideId): ToolGuide {
  return (language === "fa" ? fa : en)[id];
}
