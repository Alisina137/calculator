import type { AppLanguage } from "@/context/AppPreferencesContext";

export function toolCopy(language: AppLanguage) {
  const dari = language === "dari";
  const percent = dari ? "فیصدی" : "درصد";

  return {
    percent,
    invalidNumber: dari ? "لطفاً یک عدد معتبر وارد کنید." : "لطفاً عدد معتبر وارد کنید.",
    invalidValues: dari ? "لطفاً مقدارهای معتبر وارد کنید." : "لطفاً مقدارهای معتبر وارد کنید.",
    result: "نتیجه",
    percentage: {
      subtitle: dari
        ? "محاسبه‌های روزمره فیصدی با نتیجه فوری"
        : "محاسبه‌های روزمره درصدی با نتیجه فوری",
      of: `${percent} از عدد`,
      ratio: `چند ${percent}؟`,
      increase: `افزایش ${percent}ی`,
      decrease: `کاهش ${percent}ی`,
      base: "عدد پایه",
      part: "بخش",
      total: "کل",
      initial: "مقدار اولیه",
      next: "مقدار جدید",
      increaseAmount: "میزان افزایش",
      decreaseAmount: "میزان کاهش",
      increasePercent: `${percent} افزایش`,
      decreasePercent: `${percent} کاهش`,
      totalZero: "مقدار کل نمی‌تواند صفر باشد.",
      initialZero: "مقدار اولیه نمی‌تواند صفر باشد.",
      prompt: dari
        ? "دو مقدار را وارد کنید تا نتیجه فوراً نشان داده شود."
        : "دو مقدار را وارد کنید تا نتیجه فوراً نمایش داده شود."
    },
    discount: {
      subtitle: dari
        ? "قیمت نهایی و مقدار صرفه‌جویی را سریع ببینید"
        : "قیمت نهایی و مقدار صرفه‌جویی را سریع ببینید",
      originalPrice: "قیمت اصلی",
      discountPercent: `${percent} تخفیف`,
      quantity: "تعداد (اختیاری)",
      discountAmount: "مبلغ تخفیف",
      finalPrice: "قیمت بعد از تخفیف",
      quantityTotal: "مجموع برای تعداد",
      totalSaved: "کل صرفه‌جویی",
      negativePrice: "قیمت اصلی نمی‌تواند منفی باشد.",
      rangeError: `${percent} تخفیف باید بین ۰ تا ۱۰۰ باشد.`,
      quantityError: "تعداد باید یک عدد صحیح بیشتر از صفر باشد.",
      prompt: dari
        ? "قیمت و تخفیف را وارد کنید تا نتیجه نشان داده شود."
        : "قیمت و تخفیف را وارد کنید تا نتیجه نمایش داده شود."
    },
    unit: {
      subtitle: "تبدیل سریع واحدها بدون نیاز به اینترنت",
      category: "نوع واحد",
      value: "مقدار",
      from: "از واحد",
      to: "به واحد",
      swap: "جابه‌جایی",
      swapLabel: "جابه‌جایی واحدها",
      result: "نتیجه تبدیل",
      impossible: "تبدیل این مقدار ممکن نیست.",
      prompt: dari
        ? "مقدار و واحدها را انتخاب کنید؛ نتیجه فوراً به‌روز می‌شود."
        : "مقدار و واحدها را انتخاب کنید؛ نتیجه فوراً به‌روز می‌شود."
    },
    age: {
      subtitle: "سن دقیق با تاریخ هجری شمسی یا میلادی",
      calendarType: "نوع تقویم",
      jalali: "هجری شمسی",
      gregorian: "میلادی",
      birthDate: "تاریخ تولد",
      calculationDate: "تاریخ محاسبه",
      exactAge: "سن دقیق",
      totalDays: "مجموع روزهای عمر",
      nextBirthday: "تا تولد بعدی",
      today: "امروز",
      dateFormatError: "تاریخ را به شکل سال/ماه/روز وارد کنید.",
      futureBirthError: "تاریخ تولد باید قبل از تاریخ محاسبه باشد.",
      prompt: dari
        ? "تاریخ تولد را وارد کنید تا سن دقیق نشان داده شود."
        : "تاریخ تولد را وارد کنید تا سن دقیق نمایش داده شود."
    },
    date: {
      subtitle: "فاصله تاریخ‌ها یا افزودن و کم‌کردن زمان",
      differenceMode: "فاصله بین دو تاریخ",
      arithmeticMode: "افزودن / کم‌کردن",
      firstDate: "تاریخ اول",
      secondDate: "تاریخ دوم",
      startDate: "تاریخ شروع",
      amount: "مقدار",
      days: "روز",
      weeks: "هفته",
      months: "ماه",
      years: "سال",
      add: "افزودن",
      subtract: "کم‌کردن",
      exactDifference: "فاصله دقیق",
      totalDays: "مجموع روزها",
      resultDate: "تاریخ نتیجه",
      dateFormatError: "تاریخ را به شکل سال/ماه/روز وارد کنید.",
      secondDateError: "تاریخ دوم معتبر نیست.",
      differenceError: "امکان محاسبه فاصله وجود ندارد.",
      durationError: "مدت زمان باید یک عدد صحیح و نامنفی باشد.",
      prompt: dari
        ? "مقدارهای لازم را وارد کنید تا نتیجه نشان داده شود."
        : "مقدارهای لازم را وارد کنید تا نتیجه نمایش داده شود."
    }
  };
}
