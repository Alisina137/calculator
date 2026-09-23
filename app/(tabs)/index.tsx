import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useMemo, useState } from "react";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import {
   StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalculatorKey } from "@/components/CalculatorKey";
import { AnimatedPressable } from "@/components/AnimatedPressable";
import { isExpressionReadyForEquals } from "@/calculation/calculatorInput";
import { canPreviewExpression, evaluateExpression } from "@/calculation/calculatorEngine";
import { calculationErrorMessage } from "@/calculation/errorMessages";
import type { FinalizedCalculation } from "@/calculation/types";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { useCalculator } from "@/context/CalculatorContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";
import { displayDigits, normalizeDigits } from "@/utils/numerals";
import { textAlignment, textDirection } from "@/i18n/languages";

const standardRows = [
  ["AC", "SCI", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["⌫", "0", ".", "="]
];

const styledOperatorKeys = new Set(["AC", "⌫", "%", "÷", "×", "−", "+"]);

const scientificRows = [
  ["ANGLE", "(", ")"],
  ["sin", "cos", "tan"],
  ["ln", "log", "1/x"],
  ["√", "x²", "xʸ"],
  ["!", "π", "e"]
];

function scientificAccessibilityLabel(
  key: string,
  angleUnit: "DEG" | "RAD"
): string {
  const labels: Record<string, string> = {
    ANGLE: `واحد زاویه، ${angleUnit}`,
    "(": "پرانتز باز",
    ")": "پرانتز بسته",
    sin: "سینوس",
    cos: "کسینوس",
    tan: "تانژانت",
    ln: "لگاریتم طبیعی",
    log: "لگاریتم ده‌دهی",
    "1/x": "معکوس",
    "√": "ریشه دوم",
    "x²": "توان دو",
    "xʸ": "توان دلخواه",
    "!": "فاکتوریل",
    "π": "عدد پی",
    e: "عدد اویلر"
  };

  return labels[key] ?? key;
}

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
  const align = textAlignment(language);
  const direction = textDirection(language);
  const [finalized, setFinalized] = useState<FinalizedCalculation | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

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

  const setEditingExpression = (
    next: string,
    caret = next.length
  ) => {
    setInputError(null);
    setFinalized(null);
    setExpression(next);
    setSelection({ start: caret, end: caret });
  };

  const replaceSelection = (
    inserted: string,
    cursorOffset = inserted.length
  ) => {
    const source = finalized ? "" : expression;
    const start = finalized ? 0 : Math.min(selection.start, source.length);
    const end = finalized ? 0 : Math.min(selection.end, source.length);
    const next = source.slice(0, start) + inserted + source.slice(end);
    setEditingExpression(next, start + cursorOffset);
  };

  const deleteAtSelection = () => {
    const start = Math.min(selection.start, expression.length);
    const end = Math.min(selection.end, expression.length);

    if (start !== end) {
      setEditingExpression(
        expression.slice(0, start) + expression.slice(end),
        start
      );
      return;
    }

    if (start === 0) return;

    setEditingExpression(
      expression.slice(0, start - 1) + expression.slice(start),
      start - 1
    );
  };

  const changeScientificMode = async (next: boolean) => {
    setScientificMode(next);

    try {
      await ScreenOrientation.lockAsync(
        next
          ? ScreenOrientation.OrientationLock.LANDSCAPE
          : ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch {
      // The UI state still changes even if the device refuses an orientation lock.
    }
  };

  const handleStandardKey = async (key: string) => {
    if (key === "AC") {
      setInputError(null);
      setFinalized(null);
      setExpression("");
      setSelection({ start: 0, end: 0 });
      return;
    }

    if (key === "⌫") {
      deleteAtSelection();
      return;
    }

    if (key === "SCI") {
      await changeScientificMode(!scientificMode);
      return;
    }

    if (key === "%") {
      replaceSelection("%");
      return;
    }

    if (key === ".") {
      replaceSelection(".");
      return;
    }

    if (/^[0-9]$/.test(key)) {
      replaceSelection(key);
      return;
    }

    if (["+", "−", "×", "÷"].includes(key)) {
      replaceSelection(key);
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
      setSelection({
        start: result.formatted.length,
        end: result.formatted.length
      });
      setInputError(null);
    }
  };

  const handleScientificKey = (key: string) => {
    if (key === "ANGLE") {
      setAngleUnit(angleUnit === "DEG" ? "RAD" : "DEG");
      return;
    }

    if (key === "(" || key === ")") {
      replaceSelection(key);
      return;
    }

    if (
      key === "sin" ||
      key === "cos" ||
      key === "tan" ||
      key === "log" ||
      key === "ln"
    ) {
      replaceSelection(`${key}()`, key.length + 1);
      return;
    }

    if (key === "√") {
      replaceSelection("sqrt()", 5);
      return;
    }

    if (key === "π" || key === "e") {
      replaceSelection(key);
      return;
    }

    if (key === "x²") {
      replaceSelection("^2");
      return;
    }

    if (key === "xʸ") {
      replaceSelection("^");
      return;
    }

    if (key === "!") {
      replaceSelection("!");
      return;
    }

    if (key === "1/x") {
      const start = Math.min(selection.start, expression.length);
      const end = Math.min(selection.end, expression.length);

      if (start !== end && !finalized) {
        const selected = expression.slice(start, end);
        const inserted = `1/(${selected})`;
        const next =
          expression.slice(0, start) + inserted + expression.slice(end);
        setEditingExpression(next, start + inserted.length);
      } else {
        replaceSelection("1/()", 3);
      }
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
      <AnimatedPressable
        accessibilityRole="button"
        accessibilityLabel={t(language, "settings")}
        style={({ pressed }) => [
          styles.settingsButton,
          {
            backgroundColor: pressed ? colors.primarySoft : colors.surface,
            opacity: 1
          }
        ]}
      >
        <SymbolView
          name={{ ios: "gearshape", android: "settings", web: "settings" }}
          size={24}
          tintColor={colors.text}
        />
      </AnimatedPressable>
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
        {!scientificMode ? (
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { color: colors.text, textAlign: align, writingDirection: direction }
              ]}
            >
              {t(language, "calculator")}
            </Text>

            <View style={styles.headerActions}>
              {settingsButton}
            </View>
          </View>
        ) : null}

        <View
          style={[
            styles.display,
            scientificMode ? styles.displayLandscape : null
          ]}
        >
          <TextInput
            accessibilityLabel="عبارت محاسبه"
            accessibilityLiveRegion="polite"
            value={displayExpression}
            onChangeText={(value) => {
              const canonical = normalizeDigits(value);
              setEditingExpression(canonical, canonical.length);
            }}
            onSelectionChange={({ nativeEvent }) => {
              setSelection(nativeEvent.selection);
            }}
            selection={selection}
            showSoftInputOnFocus={false}
            caretHidden={false}
            cursorColor={colors.primary}
            selectionColor={colors.primary}
            contextMenuHidden={false}
            multiline={false}
            scrollEnabled
            style={[
              styles.expressionInput,
              scientificMode ? styles.expressionLandscape : null,
              { color: resolvedTheme === "dark" ? colors.text : "#2F6A87" }
            ]}
          />

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

        <View
          style={[
            styles.keypadDivider,
            { backgroundColor: colors.border }
          ]}
        />

        {scientificMode ? (
          <View style={styles.landscapeKeyArea}>
            <View style={styles.scientificGrid}>
              {scientificRows.map((row) => (
                <View key={row.join("-")} style={styles.scientificRow}>
                  {row.map((key) => {
                    const label = key === "ANGLE" ? angleUnit : key;

                    return (
                      <AnimatedPressable
                        key={key}
                        accessibilityRole="button"
                        accessibilityLabel={scientificAccessibilityLabel(key, angleUnit)}
                        hitSlop={8}
                        onPress={() => handleScientificKey(key)}
                        style={({ pressed }) => [
                          styles.scientificKey,
                          {
                            backgroundColor: pressed
                              ? colors.primarySoft
                              : key === "ANGLE"
                                ? colors.primarySoft
                                : colors.key,
                            borderColor:
                              resolvedTheme === "dark"
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(58,92,110,0.10)",
                            boxShadow: "0 1px 2px rgba(54, 78, 89, 0.12)",
                            opacity: 1
                          }
                        ]}
                      >
                        {({ pressed }) => (
                          <Text
                            maxFontSizeMultiplier={1.4}
                            adjustsFontSizeToFit
                            style={[
                              styles.scientificKeyText,
                              {
                                color:
                                  key === "ANGLE" ? colors.primary : colors.text,
                                fontSize: pressed ? 9.6 : 12
                              }
                            ]}
                          >
                            {label}
                          </Text>
                        )}
                      </AnimatedPressable>
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
                            ? t(language, "basicMode")
                            : "√π"
                          : /^[0-9]$/.test(key) || key === "."
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
                          ? t(language, "basicMode")
                          : "√π"
                        : /^[0-9]$/.test(key) || key === "."
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
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 6,
    minHeight: 120
  },
  displayLandscape: {
    flex: 1,
    minHeight: 86,
    paddingTop: 2,
    paddingBottom: 6,
    justifyContent: "space-between"
  },
  expressionInput: {
    width: "100%",
    minHeight: 58,
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontSize: 48,
    fontWeight: "400",
    textAlign: "left",
    writingDirection: "ltr"
  },
  expressionLandscape: {
    fontSize: 28
  },
  resultContainer: {
    alignSelf: "flex-start",
    minWidth: 72,
    marginTop: 0
  },
  resultContainerLandscape: {
    marginTop: 6
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
  },
  previewError: {
    textAlign: "right",
    writingDirection: "rtl",
  },
  previewLandscape: {
    fontSize: 20,
    minHeight: 24
  },
  keypadDivider: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
    opacity: 0.7,
    marginBottom: 2
  },
  landscapeKeyArea: {
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 14,
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 14
  },
  scientificGrid: {
    flex: 0.95,
    gap: 6,
    justifyContent: "flex-end"
  },
  scientificRow: {
    height: 32,
    minHeight: 0,
    flexDirection: "row",
    gap: 10
  },
  scientificKey: {
    flex: 1,
    minHeight: 0,
    height: 32,
    borderWidth: 1,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center"
  },
  scientificKeyText: {
    fontSize: 11,
    fontWeight: "700"
  },
  standardLandscapeGrid: {
    flex: 1.4,
    gap: 6,
    justifyContent: "flex-end"
  },
  landscapeStandardRow: {
    height: 32,
    minHeight: 0,
    flexDirection: "row",
    gap: 10
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
