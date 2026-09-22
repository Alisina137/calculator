import assert from "node:assert/strict";
import test from "node:test";
import { convertUnit, unitCategories } from "../src/tools/unitData";

function category(id: string) {
  const found = unitCategories.find((item) => item.id === id);
  assert.ok(found, `Missing unit category: ${id}`);
  return found;
}

test("every conversion family can convert between its first two units", () => {
  for (const item of unitCategories) {
    const from = item.units[0];
    const to = item.units[1];
    const result = convertUnit(1, item, from.id, to.id);
    assert.notEqual(result, null, item.id);
    assert.equal(Number.isFinite(result), true, item.id);
  }
});

test("common conversions are accurate", () => {
  assert.equal(convertUnit(1, category("length"), "kilometer", "meter"), 1000);
  assert.equal(convertUnit(1, category("mass"), "kilogram", "gram"), 1000);
  assert.equal(convertUnit(1, category("data"), "gigabyte", "megabyte"), 1024);

  const fahrenheit = convertUnit(0, category("temperature"), "celsius", "fahrenheit");
  assert.equal(fahrenheit, 32);

  const celsius = convertUnit(212, category("temperature"), "fahrenheit", "celsius");
  assert.ok(celsius != null && Math.abs(celsius - 100) < 1e-10);
});
