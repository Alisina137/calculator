import { useState } from "react";
import { Link } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { CalculatorKey } from "@/components/CalculatorKey";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";
import { displayDigits } from "@/utils/numerals";

const rows = [
  ["AC", "⌫", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["±", "0", ".", "="]
];

export default function CalculatorScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const colors = colorsFor(resolvedTheme);
  const [expression, setExpression] = useState("");

  const handleKey = (key: string) => {
    if (key === "AC") return setExpression("");
    if (key === "⌫") return setExpression((value) => value.slice(0, -1));
    if (["=", "±", "%"].includes(key)) return;
    setExpression((value) => value + key);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t(language, "calculator")}
          </Text>
          <Link href="/settings" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t(language, "settings")}
              style={({ pressed }) => [
                styles.settingsButton,
                { backgroundColor: colors.surface, opacity: pressed ? 0.65 : 1 }
              ]}
            >
              <Text style={[styles.settingsIcon, { color: colors.text }]}>⚙</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.display}>
          <ScrollView horizontal contentContainerStyle={styles.expressionScroll}>
            <Text
              accessibilityLiveRegion="polite"
              style={[styles.expression, { color: colors.text }]}
            >
              {displayDigits(expression || "0", numeralStyle)}
            </Text>
          </ScrollView>
          <Text style={[styles.preview, { color: colors.muted }]}>—</Text>
        </View>

        <View style={styles.keypad}>
          {rows.map((row) => (
            <View key={row.join("-")} style={styles.row}>
              {row.map((key) => (
                <CalculatorKey
                  key={key}
                  label={/^[0-9]$/.test(key) ? displayDigits(key, numeralStyle) : key}
                  onPress={() => handleKey(key)}
                  disabled={["=", "±", "%"].includes(key)}
                  emphasized={key === "="}
                  theme={resolvedTheme}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  page: { flex: 1, paddingHorizontal: 16, paddingTop: 8, direction: "rtl" },
  header: { minHeight: 56, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 26, fontWeight: "800", writingDirection: "rtl" },
  settingsButton: { width: 46, height: 46, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  settingsIcon: { fontSize: 22 },
  display: { flex: 1, justifyContent: "flex-end", paddingVertical: 20 },
  expressionScroll: { flexGrow: 1, alignItems: "flex-end", justifyContent: "flex-end" },
  expression: { fontSize: 52, fontWeight: "500", textAlign: "right", writingDirection: "ltr" },
  preview: { fontSize: 22, minHeight: 30, marginTop: 10, textAlign: "right" },
  keypad: { paddingBottom: 6, gap: 10 },
  row: { flexDirection: "row", gap: 10 }
});
