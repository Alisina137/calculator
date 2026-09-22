export type CalculationErrorCode =
  | "INCOMPLETE_EXPRESSION"
  | "DIVIDE_BY_ZERO"
  | "INVALID_NUMBER"
  | "MATH_DOMAIN"
  | "OVERFLOW";

export type AngleUnit = "DEG" | "RAD";

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

export type HistoryEntry = {
  id: string;
  expression: string;
  result: string;
  createdAt: number;
};

export type FinalizedCalculation = Omit<HistoryEntry, "id">;
