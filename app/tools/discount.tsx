import { useMemo, useState } from "react";
import {
  ResultCard,
  ToolField,
  ToolMessage,
  ToolScreen,
  ToolSection
} from "@/components/ToolScreen";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { t } from "@/i18n/translations";
import { formatToolNumber, parseToolNumber } from "@/tools/toolMath";
import { displayDigits } from "@/utils/numerals";

export default function DiscountToolScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const percentWord = language === "dari" ? "فیصدی" : "درصد";
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("1");

  const result = useMemo(() => {
    if (!price.trim() || !discount.trim()) return { rows: [], error: "" };

    const original = parseToolNumber(price);
    const percent = parseToolNumber(discount);
    const qty = quantity.trim() ? parseToolNumber(quantity) : 1;

    if (original == null || percent == null || qty == null) {
      return { rows: [], error: "لطفاً مقدارهای معتبر وارد کنید." };
    }
    if (original < 0) return { rows: [], error: "قیمت اصلی نمی‌تواند منفی باشد." };
    if (percent < 0 || percent > 100) {
      return { rows: [], error: `${percentWord} تخفیف باید بین ۰ تا ۱۰۰ باشد.` };
    }
    if (qty <= 0) return { rows: [], error: "تعداد باید بیشتر از صفر باشد." };

    const savedEach = original * (percent / 100);
    const finalEach = original - savedEach;
    const total = finalEach * qty;
    const totalSaved = savedEach * qty;

    return {
      rows: [
        {
          label: "مبلغ تخفیف",
          value: displayDigits(formatToolNumber(savedEach), numeralStyle)
        },
        {
          label: "قیمت بعد از تخفیف",
          value: displayDigits(formatToolNumber(finalEach), numeralStyle),
          emphasis: true
        },
        {
          label: "مجموع برای تعداد",
          value: displayDigits(formatToolNumber(total), numeralStyle)
        },
        {
          label: "کل صرفه‌جویی",
          value: displayDigits(formatToolNumber(totalSaved), numeralStyle)
        }
      ],
      error: ""
    };
  }, [price, discount, quantity, numeralStyle, percentWord]);

  return (
    <ToolScreen
      title={t(language, "discount")}
      subtitle="قیمت نهایی و مقدار صرفه‌جویی را سریع ببینید"
      theme={resolvedTheme}
    >
      <ToolSection theme={resolvedTheme}>
        <ToolField
          label="قیمت اصلی"
          value={price}
          onChangeText={setPrice}
          placeholder="2000"
          theme={resolvedTheme}
        />
        <ToolField
          label={`${percentWord} تخفیف`}
          value={discount}
          onChangeText={setDiscount}
          placeholder="20"
          theme={resolvedTheme}
        />
        <ToolField
          label="تعداد (اختیاری)"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="1"
          theme={resolvedTheme}
        />
      </ToolSection>

      {result.error ? (
        <ToolMessage text={result.error} theme={resolvedTheme} danger />
      ) : result.rows.length ? (
        <ResultCard rows={result.rows} theme={resolvedTheme} />
      ) : (
        <ToolMessage text="قیمت و تخفیف را وارد کنید تا نتیجه نمایش داده شود." theme={resolvedTheme} />
      )}
    </ToolScreen>
  );
}
