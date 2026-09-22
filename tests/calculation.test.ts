import assert from "node:assert/strict";
import test from "node:test";
import { evaluateExpression } from "../src/calculation/calculatorEngine";

function expectValue(expression: string, expected: number, angle: "DEG" | "RAD" = "DEG") {
  const result = evaluateExpression(expression, angle);
  assert.equal(result.ok, true, `Expected ${expression} to evaluate successfully`);
  if (!result.ok) return;
  assert.ok(Math.abs(result.value - expected) < 1e-10, `${expression}: ${result.value} !== ${expected}`);
}

test("basic arithmetic and precedence", () => {
  expectValue("2+3", 5);
  expectValue("10−4", 6);
  expectValue("6×7", 42);
  expectValue("20÷5", 4);
  expectValue("2+3×4", 14);
  expectValue("(2+3)×4", 20);
});

test("decimal, negative, percentage and powers", () => {
  expectValue("0.1+0.2", 0.3);
  expectValue("−5+2", -3);
  expectValue("200+10%", 220);
  expectValue("2^10", 1024);
});

test("scientific functions", () => {
  expectValue("sin(30)", 0.5);
  expectValue("cos(60)", 0.5);
  expectValue("sqrt(81)", 9);
  expectValue("log(1000)", 3);
  expectValue("5!", 120);
});

test("Persian digits and separators evaluate identically", () => {
  expectValue("۱۲۳+۷", 130);
  expectValue("۱٫۵×۲", 3);
});

test("invalid calculations return safe errors", () => {
  const divide = evaluateExpression("1÷0");
  assert.equal(divide.ok, false);
  if (!divide.ok) assert.equal(divide.code, "DIVIDE_BY_ZERO");

  const malformed = evaluateExpression("2+");
  assert.equal(malformed.ok, false);
});
