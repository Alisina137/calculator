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

  const backgroundColor = emphasized
    ? colors.primary
    : operator
      ? colors.primarySoft
      : colors.key;

  const textColor = emphasized
    ? colors.background
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
        compact ? styles.compactButton : null,
        operator && !emphasized ? styles.operatorButton : null,
        {
          backgroundColor,
          borderColor: operator && !emphasized ? colors.primary : "transparent",
          opacity: disabled ? 0.45 : pressed ? 0.7 : 1
        }
      ]}
    >
      <Text
        style={[
          styles.label,
          compact ? styles.compactLabel : null,
          operator ? styles.operatorLabel : null,
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
    flex: 1,
    minHeight: 58,
    borderRadius: 19,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  operatorButton: {
    borderWidth: 1
  },
  compactButton: {
    minHeight: 32,
    borderRadius: 11
  },
  label: {
    fontSize: 22,
    fontWeight: "700"
  },
  operatorLabel: {
    fontWeight: "800"
  },
  compactLabel: {
    fontSize: 15
  }
});
