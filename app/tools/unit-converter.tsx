import { useMemo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { AnimatedPressable } from "@/components/AnimatedPressable";
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
import { toolCopy } from "@/i18n/toolCopy";
import { toolGuidance } from "@/i18n/toolGuidance";
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
  const copy = toolCopy(language);
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
    if (parsed == null) return { value: "", error: copy.invalidNumber };

    const converted = convertUnit(parsed, category, fromId, toId);
    if (converted == null || !Number.isFinite(converted)) {
      return { value: "", error: copy.unit.impossible };
    }

    const target = category.units.find((unit) => unit.id === toId);
    return {
      value: displayDigits(
        `${formatToolNumber(converted)} ${target?.symbol ?? ""}`,
        numeralStyle
      ),
      error: ""
    };
  }, [value, category, fromId, toId, numeralStyle, copy]);

  const categoryOptions = unitCategories.map((item) => ({
    id: item.id,
    label: language === "fa" ? item.fa : item.en
  }));

  const unitOptions = category.units.map((unit) => ({
    id: unit.id,
    label: `${language === "fa" ? unit.fa : unit.en} (${unit.symbol})`
  }));

  const sourceUnit =
    category.units.find((unit) => unit.id === fromId) ?? category.units[0];

  const placeholderExample: Record<UnitCategoryId, number> = {
    length: 10,
    mass: 5,
    area: 100,
    volume: 2,
    temperature: 25,
    speed: 60,
    data: 1,
    time: 30
  };

  const amountPlaceholder = displayDigits(
    `${placeholderExample[categoryId]} ${sourceUnit.symbol}`,
    numeralStyle
  );

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  return (
    <ToolScreen
      title={t(language, "unitConverter")}
      subtitle={copy.unit.subtitle}
      theme={resolvedTheme}
      guide={toolGuidance(language, "unit")}
      guideId="unit"
    >
      <ToolSection title={copy.unit.category} theme={resolvedTheme}>
        <ChoiceRow
          options={categoryOptions}
          value={categoryId}
          onChange={setCategory}
          theme={resolvedTheme}
        />
      </ToolSection>

      <ToolSection theme={resolvedTheme}>
        <ToolField
          label={copy.unit.value}
          value={value}
          onChangeText={setValue}
          placeholder={amountPlaceholder}
          theme={resolvedTheme}
        />

        <Text style={[styles.label, { color: colors.text }]}>{copy.unit.from}</Text>
        <ChoiceRow
          options={unitOptions}
          value={fromId}
          onChange={setFromId}
          theme={resolvedTheme}
        />

        <AnimatedPressable
          accessibilityRole="button"
          accessibilityLabel={copy.unit.swapLabel}
          onPress={swap}
          style={({ pressed }) => [
            styles.swap,
            {
              backgroundColor: pressed ? colors.primary : colors.primarySoft,
              borderColor: colors.primary
            }
          ]}
        >
          <Text style={[styles.swapText, { color: colors.primary }]}>⇄ {copy.unit.swap}</Text>
        </AnimatedPressable>

        <Text style={[styles.label, { color: colors.text }]}>{copy.unit.to}</Text>
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
          rows={[{ label: copy.unit.result, value: result.value, emphasis: true }]}
          theme={resolvedTheme}
        />
      ) : (
        <ToolMessage text={copy.unit.prompt} theme={resolvedTheme} />
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
