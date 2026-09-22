import { Pressable, StyleSheet, Text } from "react-native";
import { colorsFor } from "@/theme/colors";
import type { ResolvedTheme } from "@/context/AppPreferencesContext";

export function CalculatorKey({
  label,
  onPress,
  disabled = false,
  emphasized = false,
  theme
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  emphasized?: boolean;
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
        {
          backgroundColor: emphasized ? colors.primary : colors.key,
          opacity: disabled ? 0.45 : pressed ? 0.7 : 1
        }
      ]}
    >
      <Text style={[styles.label, { color: emphasized ? colors.background : colors.text }]}>{label}</Text>
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
  label: { fontSize: 22, fontWeight: "700" }
});
