import assert from "node:assert/strict";
import test from "node:test";
import { displayDigits, normalizeDigits } from "../src/utils/numerals";

test("normalizes Persian, Arabic-Indic and Latin digits", () => {
  assert.equal(normalizeDigits("۱۲3٤٥"), "12345");
  assert.equal(normalizeDigits("۱۲٫۵"), "12.5");
  assert.equal(normalizeDigits("۱٬۲۳۴"), "1,234");
});

test("Persian display changes presentation only", () => {
  assert.equal(displayDigits("1234.5", "persian"), "۱۲۳۴٫۵");
  assert.equal(displayDigits("1,234.5", "persian"), "۱٬۲۳۴٫۵");
  assert.equal(displayDigits("۱۲۳۴٫۵", "latin"), "1234.5");
});
