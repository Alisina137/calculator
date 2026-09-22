import type { AppLanguage } from "@/context/AppPreferencesContext";
import type { CalculationErrorCode } from "./types";

const messages: Record<AppLanguage, Record<CalculationErrorCode, string>> = {
  persian: {
    INCOMPLETE_EXPRESSION: "عبارت کامل نیست",
    DIVIDE_BY_ZERO: "تقسیم بر صفر ممکن نیست",
    INVALID_NUMBER: "عدد واردشده معتبر نیست",
    OVERFLOW: "نتیجه خارج از محدوده قابل نمایش است"
  },
  dari: {
    INCOMPLETE_EXPRESSION: "عبارت کامل نیست",
    DIVIDE_BY_ZERO: "تقسیم بر صفر ممکن نیست",
    INVALID_NUMBER: "عدد واردشده معتبر نیست",
    OVERFLOW: "نتیجه خارج از محدوده قابل نمایش است"
  }
};

export function calculationErrorMessage(language: AppLanguage, code: CalculationErrorCode) {
  return messages[language][code];
}
