export type CalendarType = "gregorian" | "jalali";
export type CalendarDate = { year: number; month: number; day: number };

const breaks = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181,
  1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
];

const div = (a: number, b: number) => Math.trunc(a / b);
const mod = (a: number, b: number) => a - Math.trunc(a / b) * b;

function jalCal(jy: number) {
  const bl = breaks.length;
  const gy = jy + 621;
  let leapJ = -14;
  let jp = breaks[0];
  let jm = 0;
  let jump = 0;

  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalali year");
  }

  for (let i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ += div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }

  let n = jy - jp;
  leapJ += div(n, 33) * 8 + div(mod(n, 33) + 3, 4);

  if (mod(jump, 33) === 4 && jump - n === 4) {
    leapJ += 1;
  }

  const leapG =
    div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;

  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33;
  }

  let leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) leap = 4;

  return { leap, gy, march };
}

function g2d(gy: number, gm: number, gd: number) {
  let d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

function d2g(jdn: number): CalendarDate {
  let j = 4 * jdn + 139361631;
  j =
    j +
    div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 -
    3908;
  const i = div(mod(j, 1461), 4) * 5 + 308;
  const gd = div(mod(i, 153), 5) + 1;
  const gm = mod(div(i, 153), 12) + 1;
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { year: gy, month: gm, day: gd };
}

function j2d(jy: number, jm: number, jd: number) {
  const r = jalCal(jy);
  return (
    g2d(r.gy, 3, r.march) +
    (jm - 1) * 31 -
    div(jm, 7) * (jm - 7) +
    jd -
    1
  );
}

function d2j(jdn: number): CalendarDate {
  const g = d2g(jdn);
  let jy = g.year - 621;
  const r = jalCal(jy);
  const jdn1f = g2d(g.year, 3, r.march);
  let k = jdn - jdn1f;

  if (k >= 0) {
    if (k <= 185) {
      return {
        year: jy,
        month: 1 + div(k, 31),
        day: mod(k, 31) + 1
      };
    }
    k -= 186;
  } else {
    jy -= 1;
    k += 179;
    if (r.leap === 1) k += 1;
  }

  return {
    year: jy,
    month: 7 + div(k, 30),
    day: mod(k, 30) + 1
  };
}

export function isGregorianLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function isJalaliLeapYear(year: number): boolean {
  try {
    return jalCal(year).leap === 0;
  } catch {
    return false;
  }
}

export function daysInMonth(
  calendar: CalendarType,
  year: number,
  month: number
): number {
  if (calendar === "gregorian") {
    if (month === 2) return isGregorianLeapYear(year) ? 29 : 28;
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
  }

  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return isJalaliLeapYear(year) ? 30 : 29;
}

export function isValidCalendarDate(
  date: CalendarDate,
  calendar: CalendarType
): boolean {
  if (
    !Number.isInteger(date.year) ||
    !Number.isInteger(date.month) ||
    !Number.isInteger(date.day) ||
    date.year < 1 ||
    date.month < 1 ||
    date.month > 12
  ) {
    return false;
  }

  if (calendar === "jalali" && (date.year < -60 || date.year >= 3178)) {
    return false;
  }

  return date.day <= daysInMonth(calendar, date.year, date.month);
}

export function toGregorian(date: CalendarDate, calendar: CalendarType): CalendarDate {
  if (calendar === "gregorian") return date;
  return d2g(j2d(date.year, date.month, date.day));
}

export function fromGregorian(
  date: CalendarDate,
  calendar: CalendarType
): CalendarDate {
  if (calendar === "gregorian") return date;
  return d2j(g2d(date.year, date.month, date.day));
}

export function toDayNumber(date: CalendarDate, calendar: CalendarType): number {
  const g = toGregorian(date, calendar);
  return g2d(g.year, g.month, g.day);
}

export function fromDayNumber(dayNumber: number, calendar: CalendarType): CalendarDate {
  const g = d2g(dayNumber);
  return fromGregorian(g, calendar);
}

export function compareDates(
  a: CalendarDate,
  b: CalendarDate,
  calendar: CalendarType
): number {
  return toDayNumber(a, calendar) - toDayNumber(b, calendar);
}

export function calendarDifference(
  start: CalendarDate,
  end: CalendarDate,
  calendar: CalendarType
) {
  const totalDays = toDayNumber(end, calendar) - toDayNumber(start, calendar);
  if (totalDays < 0) return null;

  let years = end.year - start.year;
  let months = end.month - start.month;
  let days = end.day - start.day;

  if (days < 0) {
    months -= 1;
    let previousMonth = end.month - 1;
    let previousYear = end.year;
    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear -= 1;
    }
    days += daysInMonth(calendar, previousYear, previousMonth);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days, totalDays };
}

export function addCalendarDuration(
  start: CalendarDate,
  amount: number,
  unit: "days" | "weeks" | "months" | "years",
  calendar: CalendarType
): CalendarDate {
  if (unit === "days" || unit === "weeks") {
    const delta = unit === "weeks" ? amount * 7 : amount;
    return fromDayNumber(toDayNumber(start, calendar) + delta, calendar);
  }

  if (unit === "months") {
    const totalMonths = start.year * 12 + (start.month - 1) + amount;
    const year = Math.floor(totalMonths / 12);
    const month = mod(totalMonths, 12) + 1;
    const day = Math.min(start.day, daysInMonth(calendar, year, month));
    return { year, month, day };
  }

  const year = start.year + amount;
  const day = Math.min(start.day, daysInMonth(calendar, year, start.month));
  return { year, month: start.month, day };
}

export function todayInCalendar(calendar: CalendarType): CalendarDate {
  const now = new Date();
  const gregorian = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  return fromGregorian(gregorian, calendar);
}

export function formatCalendarDate(date: CalendarDate): string {
  return [
    String(date.year).padStart(4, "0"),
    String(date.month).padStart(2, "0"),
    String(date.day).padStart(2, "0")
  ].join("/");
}

export function parseCalendarDateText(
  value: string,
  calendar: CalendarType,
  normalize: (value: string) => string
): CalendarDate | null {
  const normalized = normalize(value).trim().replace(/[-.]/g, "/");
  const match = normalized.match(/^(\d{3,4})\/(\d{1,2})\/(\d{1,2})$/);
  if (!match) return null;

  const date = {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3])
  };

  return isValidCalendarDate(date, calendar) ? date : null;
}
