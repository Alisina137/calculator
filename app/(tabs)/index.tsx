import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useMemo, useState } from "react";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  squareExpression
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
  ["AC", "SCI", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["=", "0", ".", "⌫"]
];

const styledOperatorKeys = new Set(["AC", "⌫", "%", "÷", "×", "−", "+"]);

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

    if (key === "SCI") {
      setScientificMode(!scientificMode);
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
      ? displayDigits(finalized.result, numeralStyle)
      : preview
        ? displayDigits(preview, numeralStyle)
        : "";

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
        <SymbolView
          name={{ ios: "gearshape", android: "settings", web: "settings" }}
          size={24}
          tintColor={colors.text}
        />
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView
      edges={
        scientificMode
          ? ["top", "right", "bottom", "left"]
          : ["top", "right", "left"]
      }
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
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
            style={styles.expressionViewport}
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
                { color: resolvedTheme === "dark" ? colors.text : "#2F6A87" }
              ]}
            >
              {displayExpression}
            </Text>
          </ScrollView>

          <View
            style={[
              styles.resultContainer,
              scientificMode ? styles.resultContainerLandscape : null
            ]}
          >
            <Text
              accessibilityLiveRegion="polite"
              numberOfLines={2}
              style={[
                styles.preview,
                scientificMode ? styles.previewLandscape : null,
                inputError ? styles.previewError : styles.previewMath,
                {
                  color: inputError
                    ? colors.danger
                    : resolvedTheme === "dark"
                      ? colors.text
                      : "#91AFC0"
                }
              ]}
            >
              {displayPreview}
            </Text>
          </View>
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
                              key === "ANGLE" ? colors.primarySoft : colors.key,
                            borderColor: "transparent",
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
                        key === "SCI"
                          ? scientificMode
                            ? "↔"
                            : "√π"
                          : /^[0-9]$/.test(key)
                            ? displayDigits(key, numeralStyle)
                            : key
                      }
                      onPress={() => void handleStandardKey(key)}
                      emphasized={key === "="}
                      operator={styledOperatorKeys.has(key)}
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
                      key === "SCI"
                        ? scientificMode
                          ? "↔"
                          : "√π"
                        : /^[0-9]$/.test(key)
                          ? displayDigits(key, numeralStyle)
                          : key
                    }
                    onPress={() => void handleStandardKey(key)}
                    emphasized={key === "="}
                    operator={styledOperatorKeys.has(key)}
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
    paddingHorizontal: 8,
    paddingTop: 2,
    paddingBottom: 4
  },
  header: {
    minHeight: 52,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8
  },
  headerLandscape: {
    minHeight: 30
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    writingDirection: "rtl"
  },
  titleLandscape: {
    fontSize: 15
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
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
    width: 40,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  display: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 16,
    minHeight: 120
  },
  displayLandscape: {
    flex: 0.32,
    minHeight: 40,
    paddingVertical: 0
  },
  expressionViewport: {
    direction: "ltr"
  },
  expressionScroll: {
    flexGrow: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    direction: "ltr"
  },
  expression: {
    fontSize: 48,
    fontWeight: "400",
    textAlign: "left",
    writingDirection: "ltr",
    direction: "ltr"
  },
  expressionLandscape: {
    fontSize: 28
  },
  resultContainer: {
    alignSelf: "flex-start",
    minWidth: 72,
    marginTop: 12
  },
  resultContainerLandscape: {
    marginTop: 2
  },
  preview: {
    fontSize: 32,
    minHeight: 40,
    fontWeight: "500"
  },
  previewMath: {
    alignSelf: "flex-start",
    textAlign: "left",
    writingDirection: "ltr",
    direction: "ltr"
  },
  previewError: {
    textAlign: "right",
    writingDirection: "rtl",
    direction: "rtl"
  },
  previewLandscape: {
    fontSize: 20,
    minHeight: 24
  },
  landscapeKeyArea: {
    flex: 2.35,
    flexDirection: "row",
    gap: 6,
    paddingBottom: 2
  },
  scientificGrid: {
    flex: 0.95,
    gap: 3
  },
  scientificRow: {
    flex: 1,
    flexDirection: "row",
    gap: 3
  },
  scientificKey: {
    flex: 1,
    minHeight: 28,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  scientificKeyText: {
    fontSize: 12,
    fontWeight: "700"
  },
  standardLandscapeGrid: {
    flex: 1.4,
    gap: 3
  },
  landscapeStandardRow: {
    flex: 1,
    flexDirection: "row",
    gap: 3
  },
  keypad: {
    paddingBottom: 8,
    gap: 9
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
