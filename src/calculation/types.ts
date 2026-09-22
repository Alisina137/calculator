export type CalculationErrorCode =
  | "INCOMPLETE_EXPRESSION"
  | "DIVIDE_BY_ZERO"
  | "INVALID_NUMBER"
  | "OVERFLOW";

export type CalculationSuccess = {
  ok: true;
  value: number;
  formatted: string;
};

export type CalculationFailure = {
  ok: false;
  code: CalculationErrorCode;
};

export type CalculationResult = CalculationSuccess | CalculationFailure;

export type FinalizedCalculation = {
  expression: string;
  result: string;
  createdAt: number;
};
