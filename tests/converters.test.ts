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


test("every unit converts to itself without changing the value", () => {
  for (const item of unitCategories) {
    for (const unit of item.units) {
      const result = convertUnit(123.456, item, unit.id, unit.id);
      assert.notEqual(result, null, `${item.id}:${unit.id}`);
      assert.ok(Math.abs((result as number) - 123.456) < 1e-10);
    }
  }
});

test("all unit pairs round-trip accurately", () => {
  for (const item of unitCategories) {
    for (const from of item.units) {
      for (const to of item.units) {
        const forward = convertUnit(37.25, item, from.id, to.id);
        assert.notEqual(forward, null, `${item.id}:${from.id}->${to.id}`);
        const back = convertUnit(forward as number, item, to.id, from.id);
        assert.notEqual(back, null, `${item.id}:${to.id}->${from.id}`);
        assert.ok(
          Math.abs((back as number) - 37.25) < 1e-8,
          `${item.id}:${from.id}<->${to.id}`
        );
      }
    }
  }
});

test("temperature conversion boundaries are accurate", () => {
  assert.equal(convertUnit(-40, category("temperature"), "celsius", "fahrenheit"), -40);
  assert.equal(convertUnit(0, category("temperature"), "celsius", "kelvin"), 273.15);

  const celsiusFromKelvin = convertUnit(
    273.15,
    category("temperature"),
    "kelvin",
    "celsius"
  );
  assert.ok(celsiusFromKelvin != null && Math.abs(celsiusFromKelvin) < 1e-10);
});

test("invalid unit ids fail safely", () => {
  assert.equal(convertUnit(1, category("length"), "missing", "meter"), null);
  assert.equal(convertUnit(1, category("length"), "meter", "missing"), null);
});
