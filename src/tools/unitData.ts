export type UnitCategoryId =
  | "length"
  | "mass"
  | "area"
  | "volume"
  | "temperature"
  | "speed"
  | "data"
  | "time";

export type UnitDefinition = {
  id: string;
  fa: string;
  en: string;
  symbol: string;
  factor?: number;
};

export type UnitCategory = {
  id: UnitCategoryId;
  fa: string;
  en: string;
  units: UnitDefinition[];
};

export const unitCategories: UnitCategory[] = [
  {
    id: "length",
    fa: "طول",
    en: "Length",
    units: [
      { id: "meter", fa: "متر", en: "Meter", symbol: "m", factor: 1 },
      { id: "kilometer", fa: "کیلومتر", en: "Kilometer", symbol: "km", factor: 1000 },
      { id: "centimeter", fa: "سانتی‌متر", en: "Centimeter", symbol: "cm", factor: 0.01 },
      { id: "millimeter", fa: "میلی‌متر", en: "Millimeter", symbol: "mm", factor: 0.001 },
      { id: "inch", fa: "اینچ", en: "Inch", symbol: "in", factor: 0.0254 },
      { id: "foot", fa: "فوت", en: "Foot", symbol: "ft", factor: 0.3048 },
      { id: "yard", fa: "یارد", en: "Yard", symbol: "yd", factor: 0.9144 },
      { id: "mile", fa: "مایل", en: "Mile", symbol: "mi", factor: 1609.344 }
    ]
  },
  {
    id: "mass",
    fa: "وزن / جرم",
    en: "Mass / weight",
    units: [
      { id: "kilogram", fa: "کیلوگرم", en: "Kilogram", symbol: "kg", factor: 1 },
      { id: "gram", fa: "گرم", en: "Gram", symbol: "g", factor: 0.001 },
      { id: "milligram", fa: "میلی‌گرم", en: "Milligram", symbol: "mg", factor: 0.000001 },
      { id: "tonne", fa: "تن", en: "Tonne", symbol: "t", factor: 1000 },
      { id: "pound", fa: "پوند", en: "Pound", symbol: "lb", factor: 0.45359237 },
      { id: "ounce", fa: "اونس", en: "Ounce", symbol: "oz", factor: 0.028349523125 }
    ]
  },
  {
    id: "area",
    fa: "مساحت",
    en: "Area",
    units: [
      { id: "squareMeter", fa: "متر مربع", en: "Square meter", symbol: "m²", factor: 1 },
      { id: "squareKilometer", fa: "کیلومتر مربع", en: "Square kilometer", symbol: "km²", factor: 1000000 },
      { id: "hectare", fa: "هکتار", en: "Hectare", symbol: "ha", factor: 10000 },
      { id: "acre", fa: "ایکر", en: "Acre", symbol: "ac", factor: 4046.8564224 },
      { id: "squareFoot", fa: "فوت مربع", en: "Square foot", symbol: "ft²", factor: 0.09290304 }
    ]
  },
  {
    id: "volume",
    fa: "حجم",
    en: "Volume",
    units: [
      { id: "liter", fa: "لیتر", en: "Liter", symbol: "L", factor: 1 },
      { id: "milliliter", fa: "میلی‌لیتر", en: "Milliliter", symbol: "mL", factor: 0.001 },
      { id: "cubicMeter", fa: "متر مکعب", en: "Cubic meter", symbol: "m³", factor: 1000 },
      { id: "usGallon", fa: "گالن آمریکا", en: "US gallon", symbol: "gal", factor: 3.785411784 },
      { id: "cup", fa: "پیمانه", en: "Cup", symbol: "cup", factor: 0.2365882365 }
    ]
  },
  {
    id: "temperature",
    fa: "دما",
    en: "Temperature",
    units: [
      { id: "celsius", fa: "سانتی‌گراد", en: "Celsius", symbol: "°C" },
      { id: "fahrenheit", fa: "فارنهایت", en: "Fahrenheit", symbol: "°F" },
      { id: "kelvin", fa: "کلوین", en: "Kelvin", symbol: "K" }
    ]
  },
  {
    id: "speed",
    fa: "سرعت",
    en: "Speed",
    units: [
      { id: "kmh", fa: "کیلومتر بر ساعت", en: "Kilometers/hour", symbol: "km/h", factor: 1 },
      { id: "mps", fa: "متر بر ثانیه", en: "Meters/second", symbol: "m/s", factor: 3.6 },
      { id: "mph", fa: "مایل بر ساعت", en: "Miles/hour", symbol: "mph", factor: 1.609344 },
      { id: "knot", fa: "گره دریایی", en: "Knot", symbol: "kn", factor: 1.852 }
    ]
  },
  {
    id: "data",
    fa: "حجم داده",
    en: "Data",
    units: [
      { id: "byte", fa: "بایت", en: "Byte", symbol: "B", factor: 1 },
      { id: "kilobyte", fa: "کیلوبایت", en: "Kilobyte", symbol: "KB", factor: 1024 },
      { id: "megabyte", fa: "مگابایت", en: "Megabyte", symbol: "MB", factor: 1048576 },
      { id: "gigabyte", fa: "گیگابایت", en: "Gigabyte", symbol: "GB", factor: 1073741824 },
      { id: "terabyte", fa: "ترابایت", en: "Terabyte", symbol: "TB", factor: 1099511627776 }
    ]
  },
  {
    id: "time",
    fa: "زمان",
    en: "Time",
    units: [
      { id: "second", fa: "ثانیه", en: "Second", symbol: "s", factor: 1 },
      { id: "minute", fa: "دقیقه", en: "Minute", symbol: "min", factor: 60 },
      { id: "hour", fa: "ساعت", en: "Hour", symbol: "h", factor: 3600 },
      { id: "day", fa: "روز", en: "Day", symbol: "day", factor: 86400 },
      { id: "week", fa: "هفته", en: "Week", symbol: "week", factor: 604800 }
    ]
  }
];

export function convertUnit(
  value: number,
  category: UnitCategory,
  fromId: string,
  toId: string
): number | null {
  const from = category.units.find((unit) => unit.id === fromId);
  const to = category.units.find((unit) => unit.id === toId);
  if (!from || !to) return null;

  if (category.id === "temperature") {
    let celsius = value;
    if (from.id === "fahrenheit") celsius = (value - 32) * (5 / 9);
    if (from.id === "kelvin") celsius = value - 273.15;

    if (to.id === "fahrenheit") return celsius * (9 / 5) + 32;
    if (to.id === "kelvin") return celsius + 273.15;
    return celsius;
  }

  if (from.factor == null || to.factor == null) return null;
  return (value * from.factor) / to.factor;
}
