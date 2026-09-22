import assert from "node:assert/strict";
import test from "node:test";
import {
  addCalendarDuration,
  calendarDifference,
  fromGregorian,
  isGregorianLeapYear,
  isValidCalendarDate,
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
