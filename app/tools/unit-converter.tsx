import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import {
  ChoiceRow,
  ResultCard,
  ToolField,
  ToolMessage,
  ToolScreen,
  ToolSection
} from "@/components/ToolScreen";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { t } from "@/i18n/translations";
import { formatToolNumber, parseToolNumber } from "@/tools/toolMath";
import {
  convertUnit,
  unitCategories,
  type UnitCategoryId
} from "@/tools/unitData";
import { colorsFor } from "@/theme/colors";
import { displayDigits } from "@/utils/numerals";

export default function UnitConverterToolScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const colors = colorsFor(resolvedTheme);
  const [categoryId, setCategoryId] = useState<UnitCategoryId>("length");
  const category = unitCategories.find((item) => item.id === categoryId) ?? unitCategories[0];
  const [value, setValue] = useState("");
  const [fromId, setFromId] = useState(category.units[0].id);
  const [toId, setToId] = useState(category.units[1].id);

  const setCategory = (next: UnitCategoryId) => {
    const nextCategory = unitCategories.find((item) => item.id === next) ?? unitCategories[0];
    setCategoryId(next);
    setFromId(nextCategory.units[0].id);
    setToId(nextCategory.units[Math.min(1, nextCategory.units.length - 1)].id);
  };

  const result = useMemo(() => {
    if (!value.trim()) return { value: "", error: "" };
    const parsed = parseToolNumber(value);
    if (parsed == null) return { value: "", error: "لطفاً عدد معتبر وارد کنید." };

    const converted = convertUnit(parsed, category, fromId, toId);
    if (converted == null || !Number.isFinite(converted)) {
      return { value: "", error: "تبدیل این مقدار ممکن نیست." };
    }

    const target = category.units.find((unit) => unit.id === toId);
    return {
      value: displayDigits(
        `${formatToolNumber(converted)} ${target?.symbol ?? ""}`,
        numeralStyle
      ),
      error: ""
    };
  }, [value, category, fromId, toId, numeralStyle]);

  const categoryOptions = unitCategories.map((item) => ({
    id: item.id,
    label: item.fa
  }));

  const unitOptions = category.units.map((unit) => ({
    id: unit.id,
    label: `${unit.fa} (${unit.symbol})`
  }));

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  return (
    <ToolScreen
      title={t(language, "unitConverter")}
      subtitle="تبدیل سریع واحدها بدون نیاز به اینترنت"
      theme={resolvedTheme}
    >
      <ToolSection title="نوع واحد" theme={resolvedTheme}>
        <ChoiceRow
          options={categoryOptions}
          value={categoryId}
          onChange={setCategory}
          theme={resolvedTheme}
        />
      </ToolSection>

      <ToolSection theme={resolvedTheme}>
        <ToolField
          label="مقدار"
          value={value}
          onChangeText={setValue}
          placeholder="0"
          theme={resolvedTheme}
        />

        <Text style={[styles.label, { color: colors.text }]}>از واحد</Text>
        <ChoiceRow
          options={unitOptions}
          value={fromId}
          onChange={setFromId}
          theme={resolvedTheme}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="جابه‌جایی واحدها"
          onPress={swap}
          style={({ pressed }) => [
            styles.swap,
            {
              backgroundColor: pressed ? colors.key : colors.primarySoft,
              borderColor: colors.primary
            }
          ]}
        >
          <Text style={[styles.swapText, { color: colors.primary }]}>⇄ جابه‌جایی</Text>
        </Pressable>

        <Text style={[styles.label, { color: colors.text }]}>به واحد</Text>
        <ChoiceRow
          options={unitOptions}
          value={toId}
          onChange={setToId}
          theme={resolvedTheme}
        />
      </ToolSection>

      {result.error ? (
        <ToolMessage text={result.error} theme={resolvedTheme} danger />
      ) : result.value ? (
        <ResultCard
          rows={[{ label: "نتیجه تبدیل", value: result.value, emphasis: true }]}
          theme={resolvedTheme}
        />
      ) : (
        <ToolMessage text="مقدار و واحدها را انتخاب کنید؛ نتیجه فوراً به‌روز می‌شود." theme={resolvedTheme} />
      )}
    </ToolScreen>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "right",
    writingDirection: "rtl"
  },
  swap: {
    alignSelf: "center",
    minHeight: 42,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  swapText: {
    fontSize: 14,
    fontWeight: "800",
    writingDirection: "rtl"
  }
});
