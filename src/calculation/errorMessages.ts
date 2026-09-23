import type { AppLanguage } from "@/i18n/languages";
import type { CalculationErrorCode } from "./types";

const english: Record<CalculationErrorCode, string> = {
  INCOMPLETE_EXPRESSION: "The expression is incomplete",
  DIVIDE_BY_ZERO: "Division by zero is not allowed",
  INVALID_NUMBER: "The entered number is invalid",
  MATH_DOMAIN: "This operation is not defined for this value",
  OVERFLOW: "The result is outside the displayable range"
};

const persian: Record<CalculationErrorCode, string> = {
  INCOMPLETE_EXPRESSION: "عبارت کامل نیست",
  DIVIDE_BY_ZERO: "تقسیم بر صفر ممکن نیست",
  INVALID_NUMBER: "عدد واردشده معتبر نیست",
  MATH_DOMAIN: "این عملیات برای این مقدار تعریف نشده است",
  OVERFLOW: "نتیجه خارج از محدوده قابل نمایش است"
};

export function calculationErrorMessage(language: AppLanguage, code: CalculationErrorCode) {
  return (language === "fa" ? persian : english)[code];
}
