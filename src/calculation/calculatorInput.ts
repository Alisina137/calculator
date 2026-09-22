const displayOperators = ["+", "−", "×", "÷"] as const;

function isOperator(value: string) {
  return displayOperators.includes(value as (typeof displayOperators)[number]);
}

function isUnaryMinusAt(expression: string, index: number) {
  if (expression[index] !== "−") return false;
  if (index === 0) return true;
  return isOperator(expression[index - 1]) || expression[index - 1] === "(";
}

function lastOperandStart(expression: string) {
  for (let index = expression.length - 1; index >= 0; index -= 1) {
    const character = expression[index];
    if (character === "(") return index + 1;
    if (!isOperator(character)) continue;
    if (isUnaryMinusAt(expression, index)) continue;
    return index + 1;
  }
  return 0;
}

function currentOperand(expression: string) {
  return expression.slice(lastOperandStart(expression));
}

function needsImplicitMultiply(expression: string) {
  const last = expression.at(-1);
  return Boolean(last && /[0-9πe)%!]/.test(last));
}

export function appendDigit(expression: string, digit: string) {
  if (expression.endsWith(")") || expression.endsWith("π") || expression.endsWith("e") || expression.endsWith("!")) {
    return expression + "×" + digit;
  }

  const operand = currentOperand(expression);

  if (operand === "0") return expression.slice(0, -1) + digit;
  if (operand === "−0") return expression.slice(0, -1) + digit;

  return expression + digit;
}

export function appendDecimal(expression: string) {
  const operand = currentOperand(expression);

  if (operand.includes(".")) return expression;
  if (!operand || operand === "−") return expression + "0.";
  if (operand.endsWith("%") || operand.endsWith(")") || operand.endsWith("!")) return expression;

  return expression + ".";
}

export function appendOperator(expression: string, operator: string) {
  if (!isOperator(operator)) return expression;
  if (!expression) return operator === "−" ? "−" : expression;

  if (expression.endsWith(".")) expression = expression.slice(0, -1);

  const lastIndex = expression.length - 1;
  const last = expression[lastIndex];
  if (!last) return expression;

  if (last === "(") return operator === "−" ? expression + operator : expression;

  if (isOperator(last)) {
    if (last === "−" && isUnaryMinusAt(expression, lastIndex)) {
      const beforeUnary = expression[lastIndex - 1];
      if (!beforeUnary) return operator === "−" ? expression : "";
      if (isOperator(beforeUnary)) {
        if (operator === "−") return expression;
        return expression.slice(0, -2) + operator;
      }
    }

    if (operator === "−" && last !== "−") return expression + operator;
    return expression.slice(0, -1) + operator;
  }

  if (last === "^") return operator === "−" ? expression + "−" : expression;
  return expression + operator;
}

export function appendPercent(expression: string) {
  if (!expression) return expression;
  const last = expression.at(-1);

  if (!last || isOperator(last) || last === "." || last === "%" || last === "(" || last === "^") {
    return expression;
  }

  return expression + "%";
}

export function toggleSign(expression: string) {
  if (!expression) return "−";

  const start = lastOperandStart(expression);
  const operand = expression.slice(start);

  if (!operand || operand.endsWith("%") || operand.endsWith(")") || operand.endsWith("!")) {
    return expression;
  }

  if (operand.startsWith("−")) {
    return expression.slice(0, start) + operand.slice(1);
  }

  return expression.slice(0, start) + "−" + operand;
}

export function appendParenthesis(expression: string, parenthesis: "(" | ")") {
  if (parenthesis === "(") {
    return expression + (needsImplicitMultiply(expression) ? "×(" : "(");
  }

  const opens = [...expression].filter((character) => character === "(").length;
  const closes = [...expression].filter((character) => character === ")").length;
  const last = expression.at(-1);

  if (opens <= closes || !last || isOperator(last) || last === "(" || last === "." || last === "^") {
    return expression;
  }

  return expression + ")";
}

export function appendFunction(expression: string, name: "sin" | "cos" | "tan" | "log" | "ln" | "sqrt") {
  const prefix = needsImplicitMultiply(expression) ? "×" : "";
  return expression + prefix + name + "(";
}

export function appendConstant(expression: string, constant: "π" | "e") {
  const prefix = needsImplicitMultiply(expression) ? "×" : "";
  return expression + prefix + constant;
}

export function appendPower(expression: string) {
  const last = expression.at(-1);
  if (!last || isOperator(last) || last === "(" || last === "." || last === "^") return expression;
  return expression + "^";
}

export function squareExpression(expression: string) {
  const last = expression.at(-1);
  if (!last || isOperator(last) || last === "(" || last === "." || last === "^") return expression;
  return expression + "^2";
}

export function appendFactorial(expression: string) {
  const last = expression.at(-1);
  if (!last || isOperator(last) || last === "(" || last === "." || last === "^" || last === "!") {
    return expression;
  }
  return expression + "!";
}

export function reciprocalExpression(expression: string) {
  if (!expression) return "inv(";
  return `inv(${expression})`;
}

export function backspaceExpression(expression: string) {
  const scientificPrefixes = ["sqrt(", "sin(", "cos(", "tan(", "log(", "ln(", "inv("];

  for (const prefix of scientificPrefixes) {
    if (expression.endsWith(prefix)) {
      return expression.slice(0, -prefix.length);
    }
  }

  return expression.slice(0, -1);
}

export function isExpressionReadyForEquals(expression: string) {
  if (!expression) return false;

  const last = expression.at(-1);
  if (!last || last === "." || last === "(" || last === "^" || isOperator(last)) return false;

  const opens = [...expression].filter((character) => character === "(").length;
  const closes = [...expression].filter((character) => character === ")").length;

  return opens === closes;
}
