import type { AppLanguage } from "@/i18n/languages";

const en = {
  appName: "Hesab Farsi",
  calculator: "Calculator",
  tools: "Tools",
  history: "History",
  settings: "Settings",
  scientific: "Scientific",
  basicMode: "Basic",
  angle: "Angle",
  everydayTools: "Everyday tools",
  percentage: "Percentage",
  percentageDesc: "Percent of a number, percentage increase and decrease",
  discount: "Discount",
  discountDesc: "Final price and savings",
  unitConverter: "Unit converter",
  unitConverterDesc: "Length, mass, temperature and common units",
  age: "Age calculator",
  ageDesc: "Exact age with Jalali or Gregorian dates",
  date: "Date calculator",
  dateDesc: "Difference between dates and date arithmetic",
  historyEmptyTitle: "No calculations saved yet",
  historyEmptyBody: "Finished calculations will appear here.",
  reuseResult: "Use result",
  reuseExpression: "Use expression",
  delete: "Delete",
  clearAll: "Clear all",
  clearHistory: "Clear history",
  confirmClearHistoryTitle: "Clear all history?",
  confirmClearHistoryBody: "This action cannot be undone.",
  cancel: "Cancel",
  confirm: "Clear",
  language: "Language",
  numerals: "Numerals",
  appearance: "Appearance",
  haptics: "Haptic feedback",
  system: "System",
  light: "Light",
  dark: "Dark",
  persian: "Persian",
  dari: "Dari",
  persianDigits: "Persian digits ۱۲۳",
  latinDigits: "Latin digits 123",
  privacy: "Privacy",
  privacyBody: "Core calculations are performed on your device and no account is required for normal use."
} as const;

export type TranslationKey = keyof typeof en;
type TranslationOverrides = Partial<Record<TranslationKey, string>>;

const overrides: Record<AppLanguage, TranslationOverrides> = {
  en: {},
  fa: {
    appName: "حساب فارسی", calculator: "ماشین حساب", tools: "ابزارها", history: "تاریخچه", settings: "تنظیمات",
    scientific: "علمی", basicMode: "ساده", angle: "زاویه", everydayTools: "ابزارهای روزمره",
    percentage: "درصد", percentageDesc: "درصد یک عدد، افزایش و کاهش درصدی", discount: "تخفیف",
    discountDesc: "قیمت نهایی و میزان صرفه‌جویی", unitConverter: "تبدیل واحد",
    unitConverterDesc: "طول، وزن، دما و واحدهای پرکاربرد", age: "محاسبه سن",
    ageDesc: "سن دقیق با تاریخ شمسی یا میلادی", date: "محاسبه تاریخ",
    dateDesc: "فاصله بین تاریخ‌ها و افزودن یا کم کردن زمان", historyEmptyTitle: "هنوز محاسبه‌ای ذخیره نشده",
    historyEmptyBody: "پس از نهایی کردن محاسبه‌ها، آن‌ها اینجا نمایش داده می‌شوند.", reuseResult: "استفاده از نتیجه",
    reuseExpression: "استفاده از عبارت", delete: "حذف", clearAll: "پاک کردن همه", clearHistory: "پاک کردن تاریخچه",
    confirmClearHistoryTitle: "پاک کردن همه تاریخچه؟", confirmClearHistoryBody: "این کار قابل بازگشت نیست.",
    cancel: "لغو", confirm: "پاک کردن", language: "زبان", numerals: "نوع اعداد", appearance: "ظاهر",
    haptics: "بازخورد لمسی", system: "سیستم", light: "روشن", dark: "تیره", persian: "فارسی",
    persianDigits: "اعداد فارسی ۱۲۳", latinDigits: "اعداد لاتین 123", privacy: "حریم خصوصی",
    privacyBody: "محاسبات اصلی روی دستگاه انجام می‌شوند و برای استفاده عادی حساب کاربری لازم نیست."
  },
  ar: {
    calculator:"الآلة الحاسبة",tools:"الأدوات",history:"السجل",settings:"الإعدادات",scientific:"علمي",basicMode:"أساسي",
    angle:"الزاوية",everydayTools:"أدوات يومية",percentage:"النسبة المئوية",discount:"الخصم",unitConverter:"تحويل الوحدات",
    age:"حساب العمر",date:"حساب التاريخ",delete:"حذف",clearAll:"مسح الكل",clearHistory:"مسح السجل",cancel:"إلغاء",
    confirm:"مسح",language:"اللغة",numerals:"الأرقام",appearance:"المظهر",haptics:"اهتزاز اللمس",system:"النظام",
    light:"فاتح",dark:"داكن",privacy:"الخصوصية",reuseResult:"استخدام النتيجة",reuseExpression:"استخدام التعبير"
  },
  es: {
    calculator:"Calculadora",tools:"Herramientas",history:"Historial",settings:"Ajustes",scientific:"Científica",basicMode:"Básica",
    angle:"Ángulo",everydayTools:"Herramientas diarias",percentage:"Porcentaje",discount:"Descuento",unitConverter:"Conversor de unidades",
    age:"Calculadora de edad",date:"Calculadora de fechas",delete:"Eliminar",clearAll:"Borrar todo",clearHistory:"Borrar historial",
    cancel:"Cancelar",confirm:"Borrar",language:"Idioma",numerals:"Números",appearance:"Apariencia",haptics:"Respuesta háptica",
    system:"Sistema",light:"Claro",dark:"Oscuro",privacy:"Privacidad",reuseResult:"Usar resultado",reuseExpression:"Usar expresión"
  },
  fr: {
    calculator:"Calculatrice",tools:"Outils",history:"Historique",settings:"Paramètres",scientific:"Scientifique",basicMode:"Basique",
    angle:"Angle",everydayTools:"Outils du quotidien",percentage:"Pourcentage",discount:"Remise",unitConverter:"Convertisseur d’unités",
    age:"Calculateur d’âge",date:"Calculateur de date",delete:"Supprimer",clearAll:"Tout effacer",clearHistory:"Effacer l’historique",
    cancel:"Annuler",confirm:"Effacer",language:"Langue",numerals:"Chiffres",appearance:"Apparence",haptics:"Retour haptique",
    system:"Système",light:"Clair",dark:"Sombre",privacy:"Confidentialité",reuseResult:"Utiliser le résultat",reuseExpression:"Utiliser l’expression"
  },
  de: {
    calculator:"Rechner",tools:"Werkzeuge",history:"Verlauf",settings:"Einstellungen",scientific:"Wissenschaftlich",basicMode:"Standard",
    angle:"Winkel",everydayTools:"Alltagswerkzeuge",percentage:"Prozent",discount:"Rabatt",unitConverter:"Einheitenumrechner",
    age:"Altersrechner",date:"Datumsrechner",delete:"Löschen",clearAll:"Alles löschen",clearHistory:"Verlauf löschen",
    cancel:"Abbrechen",confirm:"Löschen",language:"Sprache",numerals:"Ziffern",appearance:"Darstellung",haptics:"Haptisches Feedback",
    system:"System",light:"Hell",dark:"Dunkel",privacy:"Datenschutz",reuseResult:"Ergebnis verwenden",reuseExpression:"Ausdruck verwenden"
  },
  pt: {
    calculator:"Calculadora",tools:"Ferramentas",history:"Histórico",settings:"Configurações",scientific:"Científica",basicMode:"Básica",
    angle:"Ângulo",everydayTools:"Ferramentas do dia a dia",percentage:"Porcentagem",discount:"Desconto",unitConverter:"Conversor de unidades",
    age:"Calculadora de idade",date:"Calculadora de datas",delete:"Excluir",clearAll:"Limpar tudo",clearHistory:"Limpar histórico",
    cancel:"Cancelar",confirm:"Limpar",language:"Idioma",numerals:"Números",appearance:"Aparência",haptics:"Feedback tátil",
    system:"Sistema",light:"Claro",dark:"Escuro",privacy:"Privacidade",reuseResult:"Usar resultado",reuseExpression:"Usar expressão"
  },
  ru: {
    calculator:"Калькулятор",tools:"Инструменты",history:"История",settings:"Настройки",scientific:"Научный",basicMode:"Обычный",
    angle:"Угол",everydayTools:"Повседневные инструменты",percentage:"Проценты",discount:"Скидка",unitConverter:"Конвертер единиц",
    age:"Калькулятор возраста",date:"Калькулятор дат",delete:"Удалить",clearAll:"Очистить всё",clearHistory:"Очистить историю",
    cancel:"Отмена",confirm:"Очистить",language:"Язык",numerals:"Цифры",appearance:"Оформление",haptics:"Тактильный отклик",
    system:"Система",light:"Светлая",dark:"Тёмная",privacy:"Конфиденциальность",reuseResult:"Использовать результат",reuseExpression:"Использовать выражение"
  },
  zh: {
    calculator:"计算器",tools:"工具",history:"历史",settings:"设置",scientific:"科学",basicMode:"基础",angle:"角度",
    everydayTools:"常用工具",percentage:"百分比",discount:"折扣",unitConverter:"单位换算",age:"年龄计算",date:"日期计算",
    delete:"删除",clearAll:"全部清除",clearHistory:"清除历史",cancel:"取消",confirm:"清除",language:"语言",numerals:"数字",
    appearance:"外观",haptics:"触觉反馈",system:"系统",light:"浅色",dark:"深色",privacy:"隐私",reuseResult:"使用结果",reuseExpression:"使用表达式"
  },
  ja: {
    calculator:"電卓",tools:"ツール",history:"履歴",settings:"設定",scientific:"関数電卓",basicMode:"基本",angle:"角度",
    everydayTools:"日常ツール",percentage:"パーセント",discount:"割引",unitConverter:"単位変換",age:"年齢計算",date:"日付計算",
    delete:"削除",clearAll:"すべて消去",clearHistory:"履歴を消去",cancel:"キャンセル",confirm:"消去",language:"言語",numerals:"数字",
    appearance:"外観",haptics:"触覚フィードバック",system:"システム",light:"ライト",dark:"ダーク",privacy:"プライバシー",reuseResult:"結果を使用",reuseExpression:"式を使用"
  },
  ko: {
    calculator:"계산기",tools:"도구",history:"기록",settings:"설정",scientific:"공학용",basicMode:"기본",angle:"각도",
    everydayTools:"일상 도구",percentage:"백분율",discount:"할인",unitConverter:"단위 변환",age:"나이 계산",date:"날짜 계산",
    delete:"삭제",clearAll:"모두 지우기",clearHistory:"기록 지우기",cancel:"취소",confirm:"지우기",language:"언어",numerals:"숫자",
    appearance:"화면",haptics:"햅틱 피드백",system:"시스템",light:"라이트",dark:"다크",privacy:"개인정보",reuseResult:"결과 사용",reuseExpression:"식 사용"
  },
  hi: {
    calculator:"कैलकुलेटर",tools:"उपकरण",history:"इतिहास",settings:"सेटिंग्स",scientific:"वैज्ञानिक",basicMode:"सामान्य",angle:"कोण",
    everydayTools:"दैनिक उपकरण",percentage:"प्रतिशत",discount:"छूट",unitConverter:"इकाई परिवर्तक",age:"आयु कैलकुलेटर",date:"तिथि कैलकुलेटर",
    delete:"हटाएँ",clearAll:"सब साफ़ करें",clearHistory:"इतिहास साफ़ करें",cancel:"रद्द करें",confirm:"साफ़ करें",language:"भाषा",numerals:"अंक",
    appearance:"दिखावट",haptics:"हैप्टिक प्रतिक्रिया",system:"सिस्टम",light:"हल्का",dark:"गहरा",privacy:"गोपनीयता",reuseResult:"परिणाम उपयोग करें",reuseExpression:"व्यंजक उपयोग करें"
  },
  ur: {
    calculator:"کیلکولیٹر",tools:"اوزار",history:"تاریخ",settings:"ترتیبات",scientific:"سائنسی",basicMode:"بنیادی",angle:"زاویہ",
    everydayTools:"روزمرہ کے اوزار",percentage:"فیصد",discount:"رعایت",unitConverter:"اکائی تبدیل کریں",age:"عمر کا حساب",date:"تاریخ کا حساب",
    delete:"حذف",clearAll:"سب صاف کریں",clearHistory:"تاریخ صاف کریں",cancel:"منسوخ",confirm:"صاف کریں",language:"زبان",numerals:"اعداد",
    appearance:"ظاہری شکل",haptics:"لمسی ردعمل",system:"سسٹم",light:"روشن",dark:"تاریک",privacy:"رازداری",reuseResult:"نتیجہ استعمال کریں",reuseExpression:"عبارت استعمال کریں"
  },
  tr: {
    calculator:"Hesap Makinesi",tools:"Araçlar",history:"Geçmiş",settings:"Ayarlar",scientific:"Bilimsel",basicMode:"Temel",angle:"Açı",
    everydayTools:"Günlük araçlar",percentage:"Yüzde",discount:"İndirim",unitConverter:"Birim dönüştürücü",age:"Yaş hesaplama",date:"Tarih hesaplama",
    delete:"Sil",clearAll:"Tümünü temizle",clearHistory:"Geçmişi temizle",cancel:"İptal",confirm:"Temizle",language:"Dil",numerals:"Rakamlar",
    appearance:"Görünüm",haptics:"Dokunsal geri bildirim",system:"Sistem",light:"Açık",dark:"Koyu",privacy:"Gizlilik",reuseResult:"Sonucu kullan",reuseExpression:"İfadeyi kullan"
  },
  it: {
    calculator:"Calcolatrice",tools:"Strumenti",history:"Cronologia",settings:"Impostazioni",scientific:"Scientifica",basicMode:"Base",angle:"Angolo",
    everydayTools:"Strumenti quotidiani",percentage:"Percentuale",discount:"Sconto",unitConverter:"Convertitore di unità",age:"Calcolo età",date:"Calcolo date",
    delete:"Elimina",clearAll:"Cancella tutto",clearHistory:"Cancella cronologia",cancel:"Annulla",confirm:"Cancella",language:"Lingua",numerals:"Numeri",
    appearance:"Aspetto",haptics:"Feedback aptico",system:"Sistema",light:"Chiaro",dark:"Scuro",privacy:"Privacy",reuseResult:"Usa risultato",reuseExpression:"Usa espressione"
  },
  id: {
    calculator:"Kalkulator",tools:"Alat",history:"Riwayat",settings:"Pengaturan",scientific:"Ilmiah",basicMode:"Dasar",angle:"Sudut",
    everydayTools:"Alat sehari-hari",percentage:"Persentase",discount:"Diskon",unitConverter:"Konverter satuan",age:"Kalkulator usia",date:"Kalkulator tanggal",
    delete:"Hapus",clearAll:"Hapus semua",clearHistory:"Hapus riwayat",cancel:"Batal",confirm:"Hapus",language:"Bahasa",numerals:"Angka",
    appearance:"Tampilan",haptics:"Umpan balik haptik",system:"Sistem",light:"Terang",dark:"Gelap",privacy:"Privasi",reuseResult:"Gunakan hasil",reuseExpression:"Gunakan ekspresi"
  },
  bn: {
    calculator:"ক্যালকুলেটর",tools:"টুলস",history:"ইতিহাস",settings:"সেটিংস",scientific:"বৈজ্ঞানিক",basicMode:"সাধারণ",angle:"কোণ",
    everydayTools:"দৈনন্দিন টুলস",percentage:"শতকরা",discount:"ছাড়",unitConverter:"একক রূপান্তর",age:"বয়স ক্যালকুলেটর",date:"তারিখ ক্যালকুলেটর",
    delete:"মুছুন",clearAll:"সব মুছুন",clearHistory:"ইতিহাস মুছুন",cancel:"বাতিল",confirm:"মুছুন",language:"ভাষা",numerals:"সংখ্যা",
    appearance:"চেহারা",haptics:"হ্যাপটিক প্রতিক্রিয়া",system:"সিস্টেম",light:"হালকা",dark:"গাঢ়",privacy:"গোপনীয়তা",reuseResult:"ফল ব্যবহার করুন",reuseExpression:"এক্সপ্রেশন ব্যবহার করুন"
  },
  vi: {
    calculator:"Máy tính",tools:"Công cụ",history:"Lịch sử",settings:"Cài đặt",scientific:"Khoa học",basicMode:"Cơ bản",angle:"Góc",
    everydayTools:"Công cụ hằng ngày",percentage:"Phần trăm",discount:"Giảm giá",unitConverter:"Đổi đơn vị",age:"Tính tuổi",date:"Tính ngày",
    delete:"Xóa",clearAll:"Xóa tất cả",clearHistory:"Xóa lịch sử",cancel:"Hủy",confirm:"Xóa",language:"Ngôn ngữ",numerals:"Chữ số",
    appearance:"Giao diện",haptics:"Phản hồi rung",system:"Hệ thống",light:"Sáng",dark:"Tối",privacy:"Quyền riêng tư",reuseResult:"Dùng kết quả",reuseExpression:"Dùng biểu thức"
  },
  th: {
    calculator:"เครื่องคิดเลข",tools:"เครื่องมือ",history:"ประวัติ",settings:"การตั้งค่า",scientific:"วิทยาศาสตร์",basicMode:"พื้นฐาน",angle:"มุม",
    everydayTools:"เครื่องมือประจำวัน",percentage:"เปอร์เซ็นต์",discount:"ส่วนลด",unitConverter:"แปลงหน่วย",age:"คำนวณอายุ",date:"คำนวณวันที่",
    delete:"ลบ",clearAll:"ล้างทั้งหมด",clearHistory:"ล้างประวัติ",cancel:"ยกเลิก",confirm:"ล้าง",language:"ภาษา",numerals:"ตัวเลข",
    appearance:"รูปลักษณ์",haptics:"การสั่นตอบสนอง",system:"ระบบ",light:"สว่าง",dark:"มืด",privacy:"ความเป็นส่วนตัว",reuseResult:"ใช้ผลลัพธ์",reuseExpression:"ใช้นิพจน์"
  },
  nl: {
    calculator:"Rekenmachine",tools:"Hulpmiddelen",history:"Geschiedenis",settings:"Instellingen",scientific:"Wetenschappelijk",basicMode:"Basis",angle:"Hoek",
    everydayTools:"Dagelijkse hulpmiddelen",percentage:"Percentage",discount:"Korting",unitConverter:"Eenheden omrekenen",age:"Leeftijd berekenen",date:"Datum berekenen",
    delete:"Verwijderen",clearAll:"Alles wissen",clearHistory:"Geschiedenis wissen",cancel:"Annuleren",confirm:"Wissen",language:"Taal",numerals:"Cijfers",
    appearance:"Weergave",haptics:"Haptische feedback",system:"Systeem",light:"Licht",dark:"Donker",privacy:"Privacy",reuseResult:"Resultaat gebruiken",reuseExpression:"Expressie gebruiken"
  }
};

export function t(language: AppLanguage, key: TranslationKey): string {
  return overrides[language]?.[key] ?? en[key];
}
