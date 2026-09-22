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
import { toolCopy } from "@/i18n/toolCopy";
import { formatToolNumber, parseToolNumber } from "@/tools/toolMath";
import { displayDigits } from "@/utils/numerals";

export default function DiscountToolScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const copy = toolCopy(language);
  const percentWord = copy.percent;
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("1");

  const result = useMemo(() => {
    if (!price.trim() || !discount.trim()) return { rows: [], error: "" };

    const original = parseToolNumber(price);
    const percent = parseToolNumber(discount);
    const qty = quantity.trim() ? parseToolNumber(quantity) : 1;

    if (original == null || percent == null || qty == null) {
      return { rows: [], error: copy.invalidValues };
    }
    if (original < 0) return { rows: [], error: copy.discount.negativePrice };
    if (percent < 0 || percent > 100) {
      return { rows: [], error: copy.discount.rangeError };
    }
    if (qty <= 0 || !Number.isInteger(qty)) {
      return { rows: [], error: copy.discount.quantityError };
    }

    const savedEach = original * (percent / 100);
    const finalEach = original - savedEach;
    const total = finalEach * qty;
    const totalSaved = savedEach * qty;

    return {
      rows: [
        {
          label: copy.discount.discountAmount,
          value: displayDigits(formatToolNumber(savedEach), numeralStyle)
        },
        {
          label: copy.discount.finalPrice,
          value: displayDigits(formatToolNumber(finalEach), numeralStyle),
          emphasis: true
        },
        {
          label: copy.discount.quantityTotal,
          value: displayDigits(formatToolNumber(total), numeralStyle)
        },
        {
          label: copy.discount.totalSaved,
          value: displayDigits(formatToolNumber(totalSaved), numeralStyle)
        }
      ],
      error: ""
    };
  }, [price, discount, quantity, numeralStyle, percentWord, copy]);

  return (
    <ToolScreen
      title={t(language, "discount")}
      subtitle={copy.discount.subtitle}
      theme={resolvedTheme}
    >
      <ToolSection theme={resolvedTheme}>
        <ToolField
          label={copy.discount.originalPrice}
          value={price}
          onChangeText={setPrice}
          placeholder="2000"
          theme={resolvedTheme}
        />
        <ToolField
          label={copy.discount.discountPercent}
          value={discount}
          onChangeText={setDiscount}
          placeholder="20"
          theme={resolvedTheme}
        />
        <ToolField
          label={copy.discount.quantity}
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
        <ToolMessage text={copy.discount.prompt} theme={resolvedTheme} />
      )}
    </ToolScreen>
  );
}
