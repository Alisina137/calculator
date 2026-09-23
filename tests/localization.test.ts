import assert from "node:assert/strict";
import test from "node:test";
import { displayDigits, normalizeDigits } from "../src/utils/numerals";
import { isRtlLanguage, supportedLanguages, textDirection } from "../src/i18n/languages";
import { t } from "../src/i18n/translations";

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


test("supports exactly 20 app languages with English first", () => {
  assert.equal(supportedLanguages.length, 20);
  assert.equal(supportedLanguages[0].id, "en");
  assert.equal(t("en", "calculator"), "Calculator");
});

test("uses RTL only for RTL languages", () => {
  assert.equal(isRtlLanguage("fa"), true);
  assert.equal(isRtlLanguage("ar"), true);
  assert.equal(isRtlLanguage("ur"), true);
  assert.equal(isRtlLanguage("en"), false);
  assert.equal(isRtlLanguage("es"), false);
  assert.equal(textDirection("fa"), "rtl");
  assert.equal(textDirection("en"), "ltr");
});
