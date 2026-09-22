import { Pressable, StyleSheet, Text } from "react-native";
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
  const isClear = label === "AC";

  const accessibilityLabel =
    label === "AC"
      ? "پاک کردن کامل"
      : label === "⌫"
        ? "حذف رقم"
        : label === "÷"
          ? "تقسیم"
          : label === "×"
            ? "ضرب"
            : label === "−"
              ? "منها"
              : label === "+"
                ? "جمع"
                : label === "="
                  ? "مساوی"
                  : label === "%"
                    ? language === "dari"
                      ? "فیصدی"
                      : "درصد"
                    : label === "√π"
                      ? "حالت علمی"
                      : label === "↔"
                        ? "بازگشت به حالت ساده"
                        : label;

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
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      hitSlop={compact ? 6 : 2}
      onPress={onPress}
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
  }
});
