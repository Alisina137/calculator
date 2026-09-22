import { normalizeDigits } from "@/utils/numerals";
import type { CalculationErrorCode, CalculationResult } from "./types";

type Token =
  | { type: "number"; value: number }
  | { type: "operator"; value: "+" | "-" | "*" | "/" }
  | { type: "percent" };

class CalculatorParseError extends Error {
  constructor(public readonly code: CalculationErrorCode) {
    super(code);
  }
}

const isDigit = (character: string) => /[0-9]/.test(character);

function canonicalizeExpression(expression: string) {
  return normalizeDigits(expression)
    .replace(/[٬,\s]/g, "")
    .replace(/٫/g, ".")
    .replace(/[×xX]/g, "*")
    .replace(/÷/g, "/")
    .replace(/[−–—]/g, "-");
}

function tokenize(expression: string): Token[] {
  const input = canonicalizeExpression(expression);
  const tokens: Token[] = [];
  let index = 0;

  while (index < input.length) {
    const character = input[index];

    if (isDigit(character) || character === ".") {
      let raw = "";
      let decimalCount = 0;

      while (index < input.length && (isDigit(input[index]) || input[index] === ".")) {
        if (input[index] === ".") decimalCount += 1;
        raw += input[index];
        index += 1;
      }

      if (decimalCount > 1 || raw === ".") {
        throw new CalculatorParseError("INVALID_NUMBER");
      }

      const value = Number(raw);
      if (!Number.isFinite(value)) {
        throw new CalculatorParseError("INVALID_NUMBER");
      }

      tokens.push({ type: "number", value });
      continue;
    }

    if (character === "%") {
      tokens.push({ type: "percent" });
      index += 1;
      continue;
    }

    if (character === "+" || character === "-" || character === "*" || character === "/") {
      tokens.push({ type: "operator", value: character });
      index += 1;
      continue;
    }

    throw new CalculatorParseError("INCOMPLETE_EXPRESSION");
  }

  return tokens;
}

class Parser {
  private index = 0;

  constructor(private readonly tokens: Token[]) {}

  parse(): number {
    if (this.tokens.length === 0) {
      throw new CalculatorParseError("INCOMPLETE_EXPRESSION");
    }

    const result = this.parseAdditive();

    if (this.index !== this.tokens.length) {
      throw new CalculatorParseError("INCOMPLETE_EXPRESSION");
    }

    return result;
  }

  private parseAdditive(): number {
    let left = this.parseMultiplicative();

    while (this.matchOperator("+") || this.matchOperator("-")) {
      const operator = this.previousOperator();
      const rightStart = this.index;
      const right = this.parseMultiplicative();
      const rightEndsWithPercent =
        this.index > rightStart && this.tokens[this.index - 1]?.type === "percent";

      if (rightEndsWithPercent) {
        const delta = left * right;
        left = operator === "+" ? left + delta : left - delta;
      } else {
        left = operator === "+" ? left + right : left - right;
      }

      this.assertFinite(left);
    }

    return left;
  }

  private parseMultiplicative(): number {
    let left = this.parseUnary();

    while (this.matchOperator("*") || this.matchOperator("/")) {
      const operator = this.previousOperator();
      const right = this.parseUnary();

      if (operator === "/" && right === 0) {
        throw new CalculatorParseError("DIVIDE_BY_ZERO");
      }

      left = operator === "*" ? left * right : left / right;
      this.assertFinite(left);
    }

    return left;
  }

  private parseUnary(): number {
    if (this.matchOperator("+")) return this.parseUnary();
    if (this.matchOperator("-")) return -this.parseUnary();
    return this.parsePercent();
  }

  private parsePercent(): number {
    let value = this.parsePrimary();

    while (this.tokens[this.index]?.type === "percent") {
      this.index += 1;
      value /= 100;
    }

    return value;
  }

  private parsePrimary(): number {
    const token = this.tokens[this.index];

    if (!token || token.type !== "number") {
      throw new CalculatorParseError("INCOMPLETE_EXPRESSION");
    }

    this.index += 1;
    return token.value;
  }

  private matchOperator(operator: "+" | "-" | "*" | "/") {
    const token = this.tokens[this.index];

    if (token?.type === "operator" && token.value === operator) {
      this.index += 1;
      return true;
    }

    return false;
  }

  private previousOperator() {
    const token = this.tokens[this.index - 1];

    if (!token || token.type !== "operator") {
      throw new CalculatorParseError("INCOMPLETE_EXPRESSION");
    }

    return token.value;
  }

  private assertFinite(value: number) {
    if (!Number.isFinite(value)) {
      throw new CalculatorParseError("OVERFLOW");
    }
  }
}

export function formatCalculationNumber(value: number): string {
  if (!Number.isFinite(value)) {
    throw new CalculatorParseError("OVERFLOW");
  }

  const normalized = Object.is(value, -0) ? 0 : value;
  const absolute = Math.abs(normalized);

  if (absolute !== 0 && (absolute >= 1e15 || absolute < 1e-9)) {
    return normalized
      .toExponential(10)
      .replace(/\.0+e/, "e")
      .replace(/(\.\d*?)0+e/, "$1e");
  }

  const rounded = Number.parseFloat(normalized.toPrecision(14));
  return rounded.toString();
}

export function evaluateExpression(expression: string): CalculationResult {
  try {
    const tokens = tokenize(expression);
    const value = new Parser(tokens).parse();

    return {
      ok: true,
      value,
      formatted: formatCalculationNumber(value)
    };
  } catch (error) {
    if (error instanceof CalculatorParseError) {
      return { ok: false, code: error.code };
    }

    return { ok: false, code: "INCOMPLETE_EXPRESSION" };
  }
}

export function canPreviewExpression(expression: string) {
  if (!expression.trim()) return false;
  return !/[+\-−×÷*/.]$/.test(expression.trim());
}
