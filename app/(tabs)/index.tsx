import { useEffect, useMemo, useState } from "react";
import { Link } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { CalculatorKey } from "@/components/CalculatorKey";
import {
  appendConstant,
  appendDecimal,
  appendDigit,
  appendFactorial,
  appendFunction,
  appendOperator,
  appendParenthesis,
  appendPercent,
  appendPower,
  backspaceExpression,
  isExpressionReadyForEquals,
  reciprocalExpression,
  squareExpression,
  toggleSign
} from "@/calculation/calculatorInput";
import { canPreviewExpression, evaluateExpression } from "@/calculation/calculatorEngine";
import { calculationErrorMessage } from "@/calculation/errorMessages";
import type { FinalizedCalculation } from "@/calculation/types";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { useCalculator } from "@/context/CalculatorContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";
import { displayDigits } from "@/utils/numerals";

const standardRows = [
  ["AC", "⌫", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["±", "0", ".", "="]
];

const scientificRows = [
  ["(", ")", "sin", "cos", "tan"],
  ["log", "ln", "√", "x²", "xʸ"],
  ["π", "e", "!", "1/x"]
];

export default function CalculatorScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const {
    expression,
    setExpression,
    addHistory,
    scientificMode,
    setScientificMode,
    angleUnit,
    setAngleUnit
  } = useCalculator();

  const colors = colorsFor(resolvedTheme);
  const [finalized, setFinalized] = useState<FinalizedCalculation | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  useEffect(() => {
    if (finalized && expression !== finalized.result) {
      setFinalized(null);
    }
  }, [expression, finalized]);

  const preview = useMemo(() => {
    if (!canPreviewExpression(expression)) return null;
    const result = evaluateExpression(expression, angleUnit);
    return result.ok ? result.formatted : null;
  }, [expression, angleUnit]);

  const setEditingExpression = (next: string) => {
    setInputError(null);
    setFinalized(null);
    setExpression(next);
  };

  const baseForNewValue = () => (finalized ? "" : expression);

  const handleStandardKey = async (key: string) => {
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
      setEditingExpression(appendDecimal(baseForNewValue()));
      return;
    }

    if (/^[0-9]$/.test(key)) {
      setEditingExpression(appendDigit(baseForNewValue(), key));
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

      const result = evaluateExpression(expression, angleUnit);

      if (!result.ok) {
        setInputError(calculationErrorMessage(language, result.code));
        return;
      }

      const record: FinalizedCalculation = {
        expression,
        result: result.formatted,
        createdAt: Date.now()
      };

      await addHistory(record.expression, record.result);
      setFinalized(record);
      setExpression(result.formatted);
      setInputError(null);
    }
  };

  const handleScientificKey = (key: string) => {
    const base = finalized ? "" : expression;

    if (key === "(" || key === ")") {
      setEditingExpression(appendParenthesis(base, key));
      return;
    }

    if (key === "sin" || key === "cos" || key === "tan" || key === "log" || key === "ln") {
      setEditingExpression(appendFunction(base, key));
      return;
    }

    if (key === "√") {
      setEditingExpression(appendFunction(base, "sqrt"));
      return;
    }

    if (key === "π" || key === "e") {
      setEditingExpression(appendConstant(base, key));
      return;
    }

    if (key === "x²") {
      setEditingExpression(squareExpression(expression));
      return;
    }

    if (key === "xʸ") {
      setEditingExpression(appendPower(expression));
      return;
    }

    if (key === "!") {
      setEditingExpression(appendFactorial(expression));
      return;
    }

    if (key === "1/x") {
      setEditingExpression(reciprocalExpression(expression));
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

          <View style={styles.headerActions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setScientificMode(!scientificMode)}
              style={[
                styles.modeButton,
                {
                  backgroundColor: scientificMode ? colors.primarySoft : colors.surface,
                  borderColor: scientificMode ? colors.primary : colors.border
                }
              ]}
            >
              <Text
                style={[
                  styles.modeButtonText,
                  { color: scientificMode ? colors.primary : colors.text }
                ]}
              >
                {scientificMode ? t(language, "basicMode") : t(language, "scientific")}
              </Text>
            </Pressable>

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
              minimumFontScale={0.48}
              style={[
                styles.expression,
                { color: colors.text, fontSize: scientificMode ? 42 : 52 }
              ]}
            >
              {displayExpression}
            </Text>
          </ScrollView>

          <Text
            accessibilityLiveRegion="polite"
            numberOfLines={2}
            style={[
              styles.preview,
              { color: inputError ? colors.danger : colors.muted }
            ]}
          >
            {displayPreview}
          </Text>
        </View>

        {scientificMode && (
          <View style={styles.scientificPanel}>
            <View style={styles.angleRow}>
              <Text style={[styles.angleLabel, { color: colors.muted }]}>
                {t(language, "angle")}
              </Text>
              <Pressable
                onPress={() => setAngleUnit(angleUnit === "DEG" ? "RAD" : "DEG")}
                style={[
                  styles.angleButton,
                  { backgroundColor: colors.primarySoft, borderColor: colors.primary }
                ]}
              >
                <Text style={[styles.angleButtonText, { color: colors.primary }]}>
                  {angleUnit}
                </Text>
              </Pressable>
            </View>

            {scientificRows.map((row) => (
              <View key={row.join("-")} style={styles.scientificRow}>
                {row.map((key) => (
                  <Pressable
                    key={key}
                    accessibilityRole="button"
                    accessibilityLabel={key}
                    onPress={() => handleScientificKey(key)}
                    style={({ pressed }) => [
                      styles.scientificKey,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                        opacity: pressed ? 0.65 : 1
                      }
                    ]}
                  >
                    <Text style={[styles.scientificKeyText, { color: colors.text }]}>
                      {key}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        )}

        <View style={styles.keypad}>
          {standardRows.map((row) => (
            <View key={row.join("-")} style={styles.row}>
              {row.map((key) => (
                <CalculatorKey
                  key={key}
                  label={/^[0-9]$/.test(key) ? displayDigits(key, numeralStyle) : key}
                  onPress={() => void handleStandardKey(key)}
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
    justifyContent: "space-between",
    gap: 8
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    writingDirection: "rtl"
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  modeButton: {
    minHeight: 42,
    paddingHorizontal: 13,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center"
  },
  modeButtonText: {
    fontSize: 13,
    fontWeight: "800",
    writingDirection: "rtl"
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  settingsIcon: { fontSize: 21 },
  display: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 12,
    minHeight: 100
  },
  expressionScroll: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  expression: {
    fontWeight: "500",
    textAlign: "right",
    writingDirection: "ltr"
  },
  preview: {
    fontSize: 19,
    minHeight: 29,
    marginTop: 6,
    textAlign: "right",
    writingDirection: "rtl"
  },
  scientificPanel: {
    gap: 7,
    marginBottom: 9
  },
  angleRow: {
    minHeight: 36,
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8
  },
  angleLabel: {
    fontSize: 13,
    fontWeight: "700",
    writingDirection: "rtl"
  },
  angleButton: {
    minHeight: 34,
    minWidth: 58,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  angleButtonText: {
    fontSize: 13,
    fontWeight: "900"
  },
  scientificRow: {
    flexDirection: "row",
    gap: 7
  },
  scientificKey: {
    flex: 1,
    minHeight: 42,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  scientificKeyText: {
    fontSize: 15,
    fontWeight: "700"
  },
  keypad: {
    paddingBottom: 6,
    gap: 8
  },
  row: {
    flexDirection: "row",
    gap: 8
  }
});
