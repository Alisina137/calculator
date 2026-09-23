import assert from "node:assert/strict";
import test from "node:test";
import { displayDigits, normalizeDigits } from "../src/utils/numerals";
import { isRtlLanguage, supportedLanguages, textDirection } from "../src/i18n/languages";
import { t } from "../src/i18n/translations";
import {
  defaultNumeralStyleForLanguage,
  numeralStyles,
  numeralStylesForLanguage
} from "../src/i18n/numeralStyles";

test("normalizes all supported numeral systems", () => {
  assert.equal(normalizeDigits("۱۲3٤٥"), "12345");
  assert.equal(normalizeDigits("۱۲٫۵"), "12.5");
  assert.equal(normalizeDigits("۱٬۲۳۴"), "1,234");
  assert.equal(normalizeDigits("१२३"), "123");
  assert.equal(normalizeDigits("১২৩"), "123");
  assert.equal(normalizeDigits("๑๒๓"), "123");
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


test("renders every supported numeral system", () => {
  assert.equal(numeralStyles.length, 6);
  assert.equal(displayDigits("123", "latin"), "123");
  assert.equal(displayDigits("123", "persian"), "۱۲۳");
  assert.equal(displayDigits("123", "arabic"), "١٢٣");
  assert.equal(displayDigits("123", "devanagari"), "१२३");
  assert.equal(displayDigits("123", "bengali"), "১২৩");
  assert.equal(displayDigits("123", "thai"), "๑๒๓");
});

test("chooses the common numeral style for each language", () => {
  assert.equal(defaultNumeralStyleForLanguage("en"), "latin");
  assert.equal(defaultNumeralStyleForLanguage("es"), "latin");
  assert.equal(defaultNumeralStyleForLanguage("fa"), "persian");
  assert.equal(defaultNumeralStyleForLanguage("ur"), "persian");
  assert.equal(defaultNumeralStyleForLanguage("ar"), "arabic");
  assert.equal(defaultNumeralStyleForLanguage("hi"), "devanagari");
  assert.equal(defaultNumeralStyleForLanguage("bn"), "bengali");
  assert.equal(defaultNumeralStyleForLanguage("th"), "thai");
});


test("filters numeral choices by the selected language", () => {
  assert.deepEqual(numeralStylesForLanguage("en"), ["latin"]);
  assert.deepEqual(numeralStylesForLanguage("es"), ["latin"]);
  assert.deepEqual(numeralStylesForLanguage("fa"), ["persian", "latin"]);
  assert.deepEqual(numeralStylesForLanguage("ur"), ["persian", "latin"]);
  assert.deepEqual(numeralStylesForLanguage("ar"), ["arabic", "latin"]);
  assert.deepEqual(numeralStylesForLanguage("hi"), ["devanagari", "latin"]);
  assert.deepEqual(numeralStylesForLanguage("bn"), ["bengali", "latin"]);
  assert.deepEqual(numeralStylesForLanguage("th"), ["thai", "latin"]);
});
