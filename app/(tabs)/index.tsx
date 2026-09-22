import { useMemo, useState } from "react";
import { Link } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { CalculatorKey } from "@/components/CalculatorKey";
import {
  appendDecimal,
  appendDigit,
  appendOperator,
  appendPercent,
  backspaceExpression,
  isExpressionReadyForEquals,
  toggleSign
} from "@/calculation/calculatorInput";
import { canPreviewExpression, evaluateExpression } from "@/calculation/calculatorEngine";
import { calculationErrorMessage } from "@/calculation/errorMessages";
import type { FinalizedCalculation } from "@/calculation/types";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";
import { displayDigits } from "@/utils/numerals";

const rows = [
  ["AC", "⌫", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["±", "0", ".", "="]
];

export default function CalculatorScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const colors = colorsFor(resolvedTheme);

  const [expression, setExpression] = useState("");
  const [finalized, setFinalized] = useState<FinalizedCalculation | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const preview = useMemo(() => {
    if (!canPreviewExpression(expression)) return null;

    const result = evaluateExpression(expression);
    return result.ok ? result.formatted : null;
  }, [expression]);

  const setEditingExpression = (next: string) => {
    setInputError(null);
    setFinalized(null);
    setExpression(next);
  };

  const handleKey = (key: string) => {
    if (key === "AC") {
      setInputError(null);
      setFinalized(null);
      setExpression("");
      return;
    }

    if (key === "⌫") {
      setEditingExpression(backspaceExpression(expression));
      return;
    }

    if (key === "±") {
      setEditingExpression(toggleSign(expression));
      return;
    }

    if (key === "%") {
      setEditingExpression(appendPercent(expression));
      return;
    }

    if (key === ".") {
      const base = finalized ? "" : expression;
      setEditingExpression(appendDecimal(base));
      return;
    }

    if (/^[0-9]$/.test(key)) {
      const base = finalized ? "" : expression;
      setEditingExpression(appendDigit(base, key));
      return;
    }

    if (["+", "−", "×", "÷"].includes(key)) {
      setEditingExpression(appendOperator(expression, key));
      return;
    }

    if (key === "=") {
      if (!isExpressionReadyForEquals(expression)) {
        setInputError(calculationErrorMessage(language, "INCOMPLETE_EXPRESSION"));
        return;
      }

      const result = evaluateExpression(expression);

      if (!result.ok) {
        setInputError(calculationErrorMessage(language, result.code));
        return;
      }

      const record: FinalizedCalculation = {
        expression,
        result: result.formatted,
        createdAt: Date.now()
      };

      setFinalized(record);
      setExpression(result.formatted);
      setInputError(null);
    }
  };

  const displayExpression = displayDigits(expression || "0", numeralStyle);

  const displayPreview = inputError
    ? inputError
    : finalized
      ? `= ${displayDigits(finalized.result, numeralStyle)}`
      : preview
        ? `= ${displayDigits(preview, numeralStyle)}`
        : "";

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t(language, "calculator")}
          </Text>

          <Link href="/settings" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t(language, "settings")}
              style={({ pressed }) => [
                styles.settingsButton,
                {
                  backgroundColor: colors.surface,
                  opacity: pressed ? 0.65 : 1
                }
              ]}
            >
              <Text style={[styles.settingsIcon, { color: colors.text }]}>⚙</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.display}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.expressionScroll}
          >
            <Text
              accessibilityLiveRegion="polite"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.55}
              style={[styles.expression, { color: colors.text }]}
            >
              {displayExpression}
            </Text>
          </ScrollView>

          <Text
            accessibilityLiveRegion="polite"
            style={[
              styles.preview,
              { color: inputError ? colors.danger : colors.muted }
            ]}
          >
            {displayPreview}
          </Text>
        </View>

        <View style={styles.keypad}>
          {rows.map((row) => (
            <View key={row.join("-")} style={styles.row}>
              {row.map((key) => (
                <CalculatorKey
                  key={key}
                  label={/^[0-9]$/.test(key) ? displayDigits(key, numeralStyle) : key}
                  onPress={() => handleKey(key)}
                  emphasized={key === "="}
                  theme={resolvedTheme}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  page: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    direction: "rtl"
  },
  header: {
    minHeight: 56,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    writingDirection: "rtl"
  },
  settingsButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  settingsIcon: { fontSize: 22 },
  display: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 20
  },
  expressionScroll: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  expression: {
    fontSize: 52,
    fontWeight: "500",
    textAlign: "right",
    writingDirection: "ltr"
  },
  preview: {
    fontSize: 21,
    minHeight: 31,
    marginTop: 10,
    textAlign: "right",
    writingDirection: "rtl"
  },
  keypad: {
    paddingBottom: 6,
    gap: 10
  },
  row: {
    flexDirection: "row",
    gap: 10
  }
});
