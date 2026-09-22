import { Pressable, StyleSheet, Text } from "react-native";
import { colorsFor } from "@/theme/colors";
import type { ResolvedTheme } from "@/context/AppPreferencesContext";

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
  const isClear = label === "AC";

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
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        compact ? styles.compactButton : styles.roundButton,
        {
          backgroundColor,
          borderWidth: 1,
          borderColor:
            theme === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(58,92,110,0.10)",
          boxShadow: pressed
            ? "0 0 5px 0 rgba(54, 78, 89, 0.22)"
            : compact
              ? "0 1px 2px rgba(54, 78, 89, 0.12)"
              : "0 2px 5px rgba(54, 78, 89, 0.14)",
          transform: pressed
            ? [{ translateY: 2 }]
            : [{ translateY: 0 }],
          transitionDuration: "100ms",
          transitionProperty: ["transform", "boxShadow"],
          opacity: disabled ? 0.45 : 1
        }
      ]}
    >
      <Text
        style={[
          styles.label,
          compact ? styles.compactLabel : styles.roundLabel,
          operator ? styles.operatorLabel : null,
          isClear ? styles.clearLabel : null,
          { color: textColor }
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center"
  },
  roundButton: {
    width: "20.5%",
    aspectRatio: 1,
    borderRadius: 999
  },
  compactButton: {
    flex: 1,
    minHeight: 32,
    borderRadius: 11
  },
  label: {
    fontWeight: "500"
  },
  roundLabel: {
    fontSize: 24
  },
  compactLabel: {
    fontSize: 15
  },
  operatorLabel: {
    fontWeight: "700"
  },
  clearLabel: {
    fontWeight: "500"
  }
});
