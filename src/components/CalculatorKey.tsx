import { Pressable, StyleSheet, Text } from "react-native";
import { colorsFor } from "@/theme/colors";
import type { ResolvedTheme } from "@/context/AppPreferencesContext";

export function CalculatorKey({
  label,
  onPress,
  disabled = false,
  emphasized = false,
  compact = false,
  theme
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  emphasized?: boolean;
  compact?: boolean;
  theme: ResolvedTheme;
}) {
  const colors = colorsFor(theme);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        compact ? styles.compactButton : null,
        {
          backgroundColor: emphasized ? colors.primary : colors.key,
          opacity: disabled ? 0.45 : pressed ? 0.7 : 1
        }
      ]}
    >
      <Text
        style={[
          styles.label,
          compact ? styles.compactLabel : null,
          { color: emphasized ? colors.background : colors.text }
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
    alignItems: "center",
    justifyContent: "center"
  },
  compactButton: {
    minHeight: 42,
    borderRadius: 14
  },
  label: {
    fontSize: 22,
    fontWeight: "700"
  },
  compactLabel: {
    fontSize: 18
  }
});
