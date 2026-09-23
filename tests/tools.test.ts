import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateDiscount,
  formatToolNumber,
  parseToolNumber,
  percentageChange,
  percentageOf,
  percentOf
} from "../src/tools/toolMath";

test("tool number parsing accepts localized and grouped numbers", () => {
  assert.equal(parseToolNumber("۱۲۳٫۵"), 123.5);
  assert.equal(parseToolNumber("١٢٣٫٥"), 123.5);
  assert.equal(parseToolNumber("1,234.5"), 1234.5);
  assert.equal(parseToolNumber("۱٬۲۳۴٫۵"), 1234.5);
  assert.equal(parseToolNumber(" - 42 ".replace(/ /g, "")), -42);
});

test("tool number parsing rejects malformed and non-finite input", () => {
  assert.equal(parseToolNumber(""), null);
  assert.equal(parseToolNumber("12..3"), null);
  assert.equal(parseToolNumber("abc"), null);
  assert.equal(parseToolNumber("1e309"), null);
});

test("tool number formatting is stable and removes negative zero", () => {
  assert.equal(formatToolNumber(1234.5), "1,234.5");
  assert.equal(formatToolNumber(-0), "0");
  assert.equal(formatToolNumber(1 / 3, 2), "0.33");
  assert.equal(formatToolNumber(Number.POSITIVE_INFINITY), "");
});

test("percentage of a base is correct", () => {
  assert.equal(percentOf(30, 1000), 300);
  assert.equal(percentOf(0, 1000), 0);
  assert.equal(percentOf(100, 125), 125);
  assert.equal(percentOf(12.5, 80), 10);
});

test("part as percentage of total handles normal and zero-total cases", () => {
  assert.equal(percentageOf(30, 100), 30);
  assert.equal(percentageOf(1, 4), 25);
  assert.equal(percentageOf(0, 100), 0);
  assert.equal(percentageOf(20, 0), null);
});

test("percentage change handles increase, decrease, no change and zero original", () => {
  assert.deepEqual(percentageChange(1000, 1300), { amount: 300, percent: 30 });
  assert.deepEqual(percentageChange(1000, 700), { amount: -300, percent: -30 });
  assert.deepEqual(percentageChange(1000, 1000), { amount: 0, percent: 0 });
  assert.equal(percentageChange(0, 100), null);
});

test("discount calculation handles quantity and boundary percentages", () => {
  assert.deepEqual(calculateDiscount(2000, 20, 1), {
    savedEach: 400,
    finalEach: 1600,
    total: 1600,
    totalSaved: 400
  });

  assert.deepEqual(calculateDiscount(100, 0, 3), {
    savedEach: 0,
    finalEach: 100,
    total: 300,
    totalSaved: 0
  });

  assert.deepEqual(calculateDiscount(100, 100, 2), {
    savedEach: 100,
    finalEach: 0,
    total: 0,
    totalSaved: 200
  });
});
