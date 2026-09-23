import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedPressable } from "@/components/AnimatedPressable";
import { SymbolView } from "expo-symbols";
import { colorsFor } from "@/theme/colors";
import { useAppPreferences, type ResolvedTheme } from "@/context/AppPreferencesContext";

export function CalculatorKey({
  label,
  onPress,
  disabled = false,
  emphasized = false,
  operator = false,
  compact = false,
  theme
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  emphasized?: boolean;
  operator?: boolean;
  compact?: boolean;
  theme: ResolvedTheme;
}) {
  const colors = colorsFor(theme);
  const { language } = useAppPreferences();
  const [showTooltip, setShowTooltip] = useState(false);
  const longPressTriggered = useRef(false);
  const isClear = label === "AC";
  const isDelete = label === "⌫";
  const tooltipEligible = operator || emphasized;
  const triggerOnPressIn = !tooltipEligible;

  const tooltipLabel = (() => {
    const labels: Record<string, string> =
      language === "fa"
        ? {
            AC: "پاک کردن همه",
            "⌫": "حذف",
            "%": "درصد",
            "÷": "تقسیم",
            "×": "ضرب",
            "−": "منها",
            "+": "جمع",
            "=": "مساوی"
          }
        : {
            AC: "Clear all",
            "⌫": "Delete",
            "%": "Percent",
            "÷": "Divide",
            "×": "Multiply",
            "−": "Subtract",
            "+": "Add",
            "=": "Equals"
          };

    return labels[label] ?? label;
  })();

  const accessibilityLabel = tooltipLabel;

  const backgroundColor = emphasized
    ? colors.primary
    : colors.key;

  const textColor = emphasized
    ? "#FFFFFF"
    : isClear
      ? colors.danger
      : operator
        ? colors.primary
        : colors.text;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      hitSlop={compact ? 6 : 2}
      delayLongPress={1000}
      onLongPress={
        tooltipEligible
          ? () => {
              longPressTriggered.current = true;
              setShowTooltip(true);
            }
          : undefined
      }
      onPressIn={() => {
        if (triggerOnPressIn) {
          onPress();
        }
      }}
      onPressOut={() => {
        setShowTooltip(false);
      }}
      onPress={
        triggerOnPressIn
          ? undefined
          : () => {
              if (longPressTriggered.current) {
                longPressTriggered.current = false;
                return;
              }

              onPress();
            }
      }
      style={({ pressed }) => [
        styles.button,
        compact ? styles.compactButton : styles.roundButton,
        {
          backgroundColor: pressed
            ? emphasized
              ? theme === "dark"
                ? "#789D50"
                : "#668A3B"
              : theme === "dark"
                ? "#1B292F"
                : "#DCE7ED"
            : backgroundColor,
          borderWidth: 1,
          borderColor:
            theme === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(58,92,110,0.10)",
          boxShadow: compact
            ? "0 1px 2px rgba(54, 78, 89, 0.12)"
            : "0 2px 5px rgba(54, 78, 89, 0.14)",
          opacity: disabled ? 0.45 : 1
        }
      ]}
    >
      {({ pressed }) => (
        <>
          {showTooltip ? (
            <View
              pointerEvents="none"
              style={[
                styles.tooltip,
                {
                  backgroundColor:
                    theme === "dark" ? "#E7EFF3" : "#24343D"
                }
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.tooltipText,
                  {
                    color: theme === "dark" ? "#172329" : "#FFFFFF"
                  }
                ]}
              >
                {tooltipLabel}
              </Text>
              <View
                style={[
                  styles.tooltipArrow,
                  {
                    borderTopColor:
                      theme === "dark" ? "#E7EFF3" : "#24343D"
                  }
                ]}
              />
            </View>
          ) : null}

          {isDelete ? (
          <SymbolView
            name={{
              ios: "delete.left",
              android: "backspace",
              web: "backspace"
            }}
            size={compact ? (pressed ? 15 : 17) : pressed ? 22 : 25}
            tintColor={textColor}
            style={styles.deleteIcon}
          />
          ) : (
          <Text
            maxFontSizeMultiplier={1.4}
            adjustsFontSizeToFit
            style={[
              styles.label,
              operator ? styles.operatorLabel : null,
              isClear ? styles.clearLabel : null,
              {
                color: textColor,
                fontSize: compact
                  ? pressed
                    ? 12
                    : 15
                  : pressed
                    ? 19.2
                    : 24
              }
            ]}
          >
            {label}
          </Text>
          )}
        </>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible"
  },
  tooltip: {
    position: "absolute",
    bottom: "112%",
    minWidth: 72,
    maxWidth: 140,
    minHeight: 34,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
    elevation: 10
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    writingDirection: "rtl"
  },
  tooltipArrow: {
    position: "absolute",
    bottom: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  },
  roundButton: {
    width: "20.5%",
    aspectRatio: 1,
    borderRadius: 999
  },
  compactButton: {
    flex: 1,
    minHeight: 0,
    height: 34,
    borderRadius: 999
  },
  label: {
    fontWeight: "500"
  },
  operatorLabel: {
    fontWeight: "700"
  },
  clearLabel: {
    fontWeight: "500"
  },
  deleteIcon: {
    opacity: 0.94
  }
});
