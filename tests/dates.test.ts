import assert from "node:assert/strict";
import test from "node:test";
import {
  addCalendarDuration,
  calendarDifference,
  compareDates,
  fromGregorian,
  isGregorianLeapYear,
  isJalaliLeapYear,
  isValidCalendarDate,
  parseCalendarDateText,
  toGregorian
} from "../src/tools/dateUtils";

test("Gregorian leap years are handled", () => {
  assert.equal(isGregorianLeapYear(2024), true);
  assert.equal(isGregorianLeapYear(2100), false);
  assert.equal(isValidCalendarDate({ year: 2024, month: 2, day: 29 }, "gregorian"), true);
  assert.equal(isValidCalendarDate({ year: 2023, month: 2, day: 29 }, "gregorian"), false);
});

test("known Solar Hijri and Gregorian boundary converts correctly", () => {
  const gregorian = toGregorian({ year: 1403, month: 1, day: 1 }, "jalali");
  assert.deepEqual(gregorian, { year: 2024, month: 3, day: 20 });

  const jalali = fromGregorian({ year: 2024, month: 3, day: 20 }, "jalali");
  assert.deepEqual(jalali, { year: 1403, month: 1, day: 1 });
});

test("month-end arithmetic clamps safely", () => {
  assert.deepEqual(
    addCalendarDuration({ year: 2024, month: 1, day: 31 }, 1, "months", "gregorian"),
    { year: 2024, month: 2, day: 29 }
  );
});

test("date difference handles exact and same-day cases", () => {
  assert.deepEqual(
    calendarDifference(
      { year: 2024, month: 1, day: 31 },
      { year: 2024, month: 3, day: 1 },
      "gregorian"
    ),
    { years: 0, months: 1, days: 1, totalDays: 30 }
  );

  assert.deepEqual(
    calendarDifference(
      { year: 1403, month: 1, day: 1 },
      { year: 1403, month: 1, day: 1 },
      "jalali"
    ),
    { years: 0, months: 0, days: 0, totalDays: 0 }
  );
});


test("Jalali leap-day validity is enforced", () => {
  assert.equal(isJalaliLeapYear(1399), true);
  assert.equal(isValidCalendarDate({ year: 1399, month: 12, day: 30 }, "jalali"), true);
  assert.equal(isValidCalendarDate({ year: 1400, month: 12, day: 30 }, "jalali"), false);
});

test("calendar parsing accepts supported separators and rejects invalid dates", () => {
  const identity = (value: string) => value;
  assert.deepEqual(
    parseCalendarDateText("2024-02-29", "gregorian", identity),
    { year: 2024, month: 2, day: 29 }
  );
  assert.deepEqual(
    parseCalendarDateText("1403.01.01", "jalali", identity),
    { year: 1403, month: 1, day: 1 }
  );
  assert.equal(parseCalendarDateText("2023/02/29", "gregorian", identity), null);
  assert.equal(parseCalendarDateText("1400/13/01", "jalali", identity), null);
});

test("Gregorian and Jalali conversion round-trips across representative dates", () => {
  const samples = [
    { year: 2024, month: 3, day: 20 },
    { year: 2025, month: 1, day: 1 },
    { year: 2000, month: 2, day: 29 },
    { year: 2030, month: 12, day: 31 }
  ];

  for (const gregorian of samples) {
    const jalali = fromGregorian(gregorian, "jalali");
    assert.deepEqual(toGregorian(jalali, "jalali"), gregorian);
  }
});

test("date arithmetic supports adding and subtracting all duration units", () => {
  assert.deepEqual(
    addCalendarDuration({ year: 2024, month: 3, day: 1 }, -1, "days", "gregorian"),
    { year: 2024, month: 2, day: 29 }
  );
  assert.deepEqual(
    addCalendarDuration({ year: 2024, month: 3, day: 1 }, 2, "weeks", "gregorian"),
    { year: 2024, month: 3, day: 15 }
  );
  assert.deepEqual(
    addCalendarDuration({ year: 2024, month: 3, day: 31 }, -1, "months", "gregorian"),
    { year: 2024, month: 2, day: 29 }
  );
  assert.deepEqual(
    addCalendarDuration({ year: 2024, month: 2, day: 29 }, 1, "years", "gregorian"),
    { year: 2025, month: 2, day: 28 }
  );
});

test("date comparison and reversed age/date ranges behave safely", () => {
  assert.ok(
    compareDates(
      { year: 2024, month: 1, day: 1 },
      { year: 2024, month: 1, day: 2 },
      "gregorian"
    ) < 0
  );

  assert.equal(
    calendarDifference(
      { year: 2024, month: 1, day: 2 },
      { year: 2024, month: 1, day: 1 },
      "gregorian"
    ),
    null
  );
});
