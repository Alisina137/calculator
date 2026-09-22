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
  symbol: string;
  factor?: number;
};

export type UnitCategory = {
  id: UnitCategoryId;
  fa: string;
  units: UnitDefinition[];
};

export const unitCategories: UnitCategory[] = [
  {
    id: "length",
    fa: "طول",
    units: [
      { id: "meter", fa: "متر", symbol: "m", factor: 1 },
      { id: "kilometer", fa: "کیلومتر", symbol: "km", factor: 1000 },
      { id: "centimeter", fa: "سانتی‌متر", symbol: "cm", factor: 0.01 },
      { id: "millimeter", fa: "میلی‌متر", symbol: "mm", factor: 0.001 },
      { id: "inch", fa: "اینچ", symbol: "in", factor: 0.0254 },
      { id: "foot", fa: "فوت", symbol: "ft", factor: 0.3048 },
      { id: "yard", fa: "یارد", symbol: "yd", factor: 0.9144 },
      { id: "mile", fa: "مایل", symbol: "mi", factor: 1609.344 }
    ]
  },
  {
    id: "mass",
    fa: "وزن / جرم",
    units: [
      { id: "kilogram", fa: "کیلوگرم", symbol: "kg", factor: 1 },
      { id: "gram", fa: "گرم", symbol: "g", factor: 0.001 },
      { id: "milligram", fa: "میلی‌گرم", symbol: "mg", factor: 0.000001 },
      { id: "tonne", fa: "تن", symbol: "t", factor: 1000 },
      { id: "pound", fa: "پوند", symbol: "lb", factor: 0.45359237 },
      { id: "ounce", fa: "اونس", symbol: "oz", factor: 0.028349523125 }
    ]
  },
  {
    id: "area",
    fa: "مساحت",
    units: [
      { id: "squareMeter", fa: "متر مربع", symbol: "m²", factor: 1 },
      { id: "squareKilometer", fa: "کیلومتر مربع", symbol: "km²", factor: 1000000 },
      { id: "hectare", fa: "هکتار", symbol: "ha", factor: 10000 },
      { id: "acre", fa: "ایکر", symbol: "ac", factor: 4046.8564224 },
      { id: "squareFoot", fa: "فوت مربع", symbol: "ft²", factor: 0.09290304 }
    ]
  },
  {
    id: "volume",
    fa: "حجم",
    units: [
      { id: "liter", fa: "لیتر", symbol: "L", factor: 1 },
      { id: "milliliter", fa: "میلی‌لیتر", symbol: "mL", factor: 0.001 },
      { id: "cubicMeter", fa: "متر مکعب", symbol: "m³", factor: 1000 },
      { id: "usGallon", fa: "گالن آمریکا", symbol: "gal", factor: 3.785411784 },
      { id: "cup", fa: "پیمانه", symbol: "cup", factor: 0.2365882365 }
    ]
  },
  {
    id: "temperature",
    fa: "دما",
    units: [
      { id: "celsius", fa: "سانتی‌گراد", symbol: "°C" },
      { id: "fahrenheit", fa: "فارنهایت", symbol: "°F" },
      { id: "kelvin", fa: "کلوین", symbol: "K" }
    ]
  },
  {
    id: "speed",
    fa: "سرعت",
    units: [
      { id: "kmh", fa: "کیلومتر بر ساعت", symbol: "km/h", factor: 1 },
      { id: "mps", fa: "متر بر ثانیه", symbol: "m/s", factor: 3.6 },
      { id: "mph", fa: "مایل بر ساعت", symbol: "mph", factor: 1.609344 },
      { id: "knot", fa: "گره دریایی", symbol: "kn", factor: 1.852 }
    ]
  },
  {
    id: "data",
    fa: "حجم داده",
    units: [
      { id: "byte", fa: "بایت", symbol: "B", factor: 1 },
      { id: "kilobyte", fa: "کیلوبایت", symbol: "KB", factor: 1024 },
      { id: "megabyte", fa: "مگابایت", symbol: "MB", factor: 1048576 },
      { id: "gigabyte", fa: "گیگابایت", symbol: "GB", factor: 1073741824 },
      { id: "terabyte", fa: "ترابایت", symbol: "TB", factor: 1099511627776 }
    ]
  },
  {
    id: "time",
    fa: "زمان",
    units: [
      { id: "second", fa: "ثانیه", symbol: "s", factor: 1 },
      { id: "minute", fa: "دقیقه", symbol: "min", factor: 60 },
      { id: "hour", fa: "ساعت", symbol: "h", factor: 3600 },
      { id: "day", fa: "روز", symbol: "day", factor: 86400 },
      { id: "week", fa: "هفته", symbol: "week", factor: 604800 }
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
