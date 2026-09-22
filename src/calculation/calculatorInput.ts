const displayOperators = ["+", "−", "×", "÷"] as const;

function isOperator(value: string) {
  return displayOperators.includes(value as (typeof displayOperators)[number]);
}

function lastOperandStart(expression: string) {
  for (let index = expression.length - 1; index >= 0; index -= 1) {
    if (isOperator(expression[index])) return index + 1;
  }
  return 0;
}

function currentOperand(expression: string) {
  return expression.slice(lastOperandStart(expression));
}

export function appendDigit(expression: string, digit: string) {
  const operand = currentOperand(expression);

  if (operand === "0") {
    return expression.slice(0, -1) + digit;
  }

  if (operand === "−0") {
    return expression.slice(0, -1) + digit;
  }

  return expression + digit;
}

export function appendDecimal(expression: string) {
  const operand = currentOperand(expression);

  if (operand.includes(".")) return expression;

  if (!operand || operand === "−") {
    return expression + "0.";
  }

  if (operand.endsWith("%")) return expression;

  return expression + ".";
}

export function appendOperator(expression: string, operator: string) {
  if (!isOperator(operator)) return expression;
  if (!expression) return operator === "−" ? "−" : expression;

  if (expression.endsWith(".")) {
    expression = expression.slice(0, -1);
  }

  const last = expression.at(-1);
  if (!last) return expression;

  if (isOperator(last)) {
    if (operator === "−" && last !== "−") {
      return expression + operator;
    }
    return expression.slice(0, -1) + operator;
  }

  if (last === "%") return expression + operator;
  return expression + operator;
}

export function appendPercent(expression: string) {
  if (!expression) return expression;
  const last = expression.at(-1);
  if (!last || isOperator(last) || last === "." || last === "%") return expression;
  return expression + "%";
}

export function toggleSign(expression: string) {
  if (!expression) return "−";

  const start = lastOperandStart(expression);
  const operand = expression.slice(start);
  if (!operand || operand.endsWith("%")) return expression;

  if (operand.startsWith("−")) {
    return expression.slice(0, start) + operand.slice(1);
  }

  return expression.slice(0, start) + "−" + operand;
}

export function backspaceExpression(expression: string) {
  return expression.slice(0, -1);
}

export function isExpressionReadyForEquals(expression: string) {
  if (!expression) return false;
  const last = expression.at(-1);
  return Boolean(last && !isOperator(last) && last !== ".");
}
