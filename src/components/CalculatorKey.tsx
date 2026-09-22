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
          shadowColor: compact ? "#66808D" : "transparent",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: compact ? 0.05 : 0,
          shadowRadius: compact ? 1 : 0,
          elevation: compact ? 1 : 0,
          opacity: disabled ? 0.45 : pressed ? 0.72 : 1
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
