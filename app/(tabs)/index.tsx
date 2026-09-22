import * as ScreenOrientation from "expo-screen-orientation";
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
  ["ANGLE", "(", ")"],
  ["sin", "cos", "tan"],
  ["ln", "log", "1/x"],
  ["√", "x²", "xʸ"],
  ["!", "π", "e"]
];

function ScientificModeIcon({
  active,
  color,
  accent,
  background
}: {
  active: boolean;
  color: string;
  accent: string;
  background: string;
}) {
  return (
    <View
      style={[
        styles.modeIconBox,
        {
          borderColor: active ? accent : color,
          backgroundColor: background
        }
      ]}
    >
      <Text style={[styles.modeIconTop, { color: active ? accent : color }]}>√π</Text>
      <View style={styles.modeIconDots}>
        <View style={[styles.modeDot, { backgroundColor: active ? accent : color }]} />
        <View style={[styles.modeDot, { backgroundColor: active ? accent : color }]} />
      </View>
    </View>
  );
}

export default function CalculatorScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const {
    expression,
    setExpression,
    addHistory,
    scientificMode,
    setScientificMode,
    angleUnit,
    setAngleUnit,
    hydrated
  } = useCalculator();

  const colors = colorsFor(resolvedTheme);
  const [finalized, setFinalized] = useState<FinalizedCalculation | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) return;

    const lock = scientificMode
      ? ScreenOrientation.OrientationLock.LANDSCAPE
      : ScreenOrientation.OrientationLock.PORTRAIT_UP;

    ScreenOrientation.lockAsync(lock).catch(() => undefined);
  }, [scientificMode, hydrated]);

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

    if (key === "ANGLE") {
      setAngleUnit(angleUnit === "DEG" ? "RAD" : "DEG");
      return;
    }

    if (key === "(" || key === ")") {
      setEditingExpression(appendParenthesis(base, key));
      return;
    }

    if (
      key === "sin" ||
      key === "cos" ||
      key === "tan" ||
      key === "log" ||
      key === "ln"
    ) {
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

  const modeButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        scientificMode ? t(language, "basicMode") : t(language, "scientific")
      }
      onPress={() => setScientificMode(!scientificMode)}
      style={({ pressed }) => [
        styles.modeButton,
        {
          backgroundColor: scientificMode ? colors.primarySoft : colors.surface,
          borderColor: scientificMode ? colors.primary : colors.border,
          opacity: pressed ? 0.65 : 1
        }
      ]}
    >
      <ScientificModeIcon
        active={scientificMode}
        color={colors.muted}
        accent={colors.primary}
        background="transparent"
      />
    </Pressable>
  );

  const settingsButton = (
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
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.page,
          scientificMode ? styles.pageLandscape : null
        ]}
      >
        <View
          style={[
            styles.header,
            scientificMode ? styles.headerLandscape : null
          ]}
        >
          <Text
            style={[
              styles.title,
              scientificMode ? styles.titleLandscape : null,
              { color: colors.text }
            ]}
          >
            {t(language, "calculator")}
          </Text>

          <View style={styles.headerActions}>
            {modeButton}
            {settingsButton}
          </View>
        </View>

        <View
          style={[
            styles.display,
            scientificMode ? styles.displayLandscape : null
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.expressionScroll}
          >
            <Text
              accessibilityLiveRegion="polite"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.45}
              style={[
                styles.expression,
                scientificMode ? styles.expressionLandscape : null,
                { color: colors.text }
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
              scientificMode ? styles.previewLandscape : null,
              { color: inputError ? colors.danger : colors.muted }
            ]}
          >
            {displayPreview}
          </Text>
        </View>

        {scientificMode ? (
          <View style={styles.landscapeKeyArea}>
            <View style={styles.scientificGrid}>
              {scientificRows.map((row) => (
                <View key={row.join("-")} style={styles.scientificRow}>
                  {row.map((key) => {
                    const label = key === "ANGLE" ? angleUnit : key;

                    return (
                      <Pressable
                        key={key}
                        accessibilityRole="button"
                        accessibilityLabel={label}
                        onPress={() => handleScientificKey(key)}
                        style={({ pressed }) => [
                          styles.scientificKey,
                          {
                            backgroundColor:
                              key === "ANGLE" ? colors.primarySoft : colors.surface,
                            borderColor:
                              key === "ANGLE" ? colors.primary : colors.border,
                            opacity: pressed ? 0.65 : 1
                          }
                        ]}
                      >
                        <Text
                          style={[
                            styles.scientificKeyText,
                            {
                              color:
                                key === "ANGLE" ? colors.primary : colors.text
                            }
                          ]}
                        >
                          {label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>

            <View style={styles.standardLandscapeGrid}>
              {standardRows.map((row) => (
                <View key={row.join("-")} style={styles.landscapeStandardRow}>
                  {row.map((key) => (
                    <CalculatorKey
                      key={key}
                      label={
                        /^[0-9]$/.test(key)
                          ? displayDigits(key, numeralStyle)
                          : key
                      }
                      onPress={() => void handleStandardKey(key)}
                      emphasized={key === "="}
                      compact
                      theme={resolvedTheme}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.keypad}>
            {standardRows.map((row) => (
              <View key={row.join("-")} style={styles.row}>
                {row.map((key) => (
                  <CalculatorKey
                    key={key}
                    label={
                      /^[0-9]$/.test(key)
                        ? displayDigits(key, numeralStyle)
                        : key
                    }
                    onPress={() => void handleStandardKey(key)}
                    emphasized={key === "="}
                    theme={resolvedTheme}
                  />
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  page: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    direction: "rtl"
  },
  pageLandscape: {
    paddingHorizontal: 18,
    paddingTop: 4
  },
  header: {
    minHeight: 56,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8
  },
  headerLandscape: {
    minHeight: 44
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    writingDirection: "rtl"
  },
  titleLandscape: {
    fontSize: 18
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  modeButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modeIconBox: {
    width: 24,
    height: 28,
    borderRadius: 5,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  modeIconTop: {
    fontSize: 9,
    fontWeight: "900",
    lineHeight: 11
  },
  modeIconDots: {
    marginTop: 2,
    flexDirection: "row",
    gap: 3
  },
  modeDot: {
    width: 3,
    height: 3,
    borderRadius: 2
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  settingsIcon: {
    fontSize: 21
  },
  display: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 12,
    minHeight: 100
  },
  displayLandscape: {
    flex: 0.55,
    minHeight: 64,
    paddingVertical: 4
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
  expressionLandscape: {
    fontSize: 34
  },
  preview: {
    fontSize: 19,
    minHeight: 29,
    marginTop: 6,
    textAlign: "right",
    writingDirection: "rtl"
  },
  previewLandscape: {
    fontSize: 16,
    minHeight: 22,
    marginTop: 2
  },
  landscapeKeyArea: {
    flex: 1.75,
    flexDirection: "row",
    gap: 14,
    paddingBottom: 4
  },
  scientificGrid: {
    flex: 0.9,
    gap: 6
  },
  scientificRow: {
    flex: 1,
    flexDirection: "row",
    gap: 6
  },
  scientificKey: {
    flex: 1,
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  scientificKeyText: {
    fontSize: 15,
    fontWeight: "700"
  },
  standardLandscapeGrid: {
    flex: 1.35,
    gap: 6
  },
  landscapeStandardRow: {
    flex: 1,
    flexDirection: "row",
    gap: 6
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
