import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { useCalculator } from "@/context/CalculatorContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";
import { displayDigits } from "@/utils/numerals";

export default function HistoryScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const {
    history,
    reuseResult,
    reuseExpression,
    deleteHistory,
    clearHistory
  } = useCalculator();

  const colors = colorsFor(resolvedTheme);

  const goToCalculator = () => {
    router.replace("/");
  };

  if (history.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
        <View style={styles.page}>
          <Text style={[styles.title, { color: colors.text }]}>{t(language, "history")}</Text>
          <View style={[styles.emptyCard, { backgroundColor: colors.surface }]}>
            <Text style={styles.icon}>↺</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              {t(language, "historyEmptyTitle")}
            </Text>
            <Text style={[styles.emptyBody, { color: colors.muted }]}>
              {t(language, "historyEmptyBody")}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{t(language, "history")}</Text>
          <Pressable
            onPress={() => void clearHistory()}
            style={({ pressed }) => [
              styles.clearButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                opacity: pressed ? 0.65 : 1
              }
            ]}
          >
            <Text style={[styles.clearText, { color: colors.danger }]}>
              {t(language, "clearAll")}
            </Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.list}>
          {history.map((entry) => {
            const dateText = displayDigits(
              new Date(entry.createdAt).toLocaleString("fa-IR-u-nu-latn"),
              numeralStyle
            );

            return (
              <View
                key={entry.id}
                style={[styles.card, { backgroundColor: colors.surface }]}
              >
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    reuseResult(entry);
                    goToCalculator();
                  }}
                >
                  <Text
                    style={[styles.expression, { color: colors.muted }]}
                    numberOfLines={2}
                  >
                    {displayDigits(entry.expression, numeralStyle)}
                  </Text>
                  <Text style={[styles.result, { color: colors.text }]}>
                    = {displayDigits(entry.result, numeralStyle)}
                  </Text>
                  <Text style={[styles.date, { color: colors.muted }]}>
                    {dateText}
                  </Text>
                </Pressable>

                <View style={styles.actions}>
                  <Pressable
                    onPress={() => {
                      reuseExpression(entry);
                      goToCalculator();
                    }}
                    style={[styles.actionButton, { borderColor: colors.border }]}
                  >
                    <Text style={[styles.actionText, { color: colors.primary }]}>
                      {t(language, "reuseExpression")}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => void deleteHistory(entry.id)}
                    style={[styles.actionButton, { borderColor: colors.border }]}
                  >
                    <Text style={[styles.actionText, { color: colors.danger }]}>
                      {t(language, "delete")}
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  page: { flex: 1, padding: 18, direction: "rtl" },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    textAlign: "right",
    writingDirection: "rtl"
  },
  clearButton: {
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  clearText: {
    fontSize: 13,
    fontWeight: "800",
    writingDirection: "rtl"
  },
  list: {
    paddingTop: 18,
    paddingBottom: 110,
    gap: 12
  },
  card: {
    borderRadius: 22,
    padding: 16,
    gap: 12
  },
  expression: {
    fontSize: 16,
    textAlign: "right",
    writingDirection: "ltr"
  },
  result: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: "800",
    textAlign: "right",
    writingDirection: "ltr"
  },
  date: {
    marginTop: 7,
    fontSize: 12,
    textAlign: "right",
    writingDirection: "rtl"
  },
  actions: {
    flexDirection: "row-reverse",
    gap: 8
  },
  actionButton: {
    flex: 1,
    minHeight: 42,
    borderWidth: 1,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  actionText: {
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    writingDirection: "rtl"
  },
  emptyCard: {
    marginTop: "45%",
    borderRadius: 24,
    padding: 24,
    alignItems: "center"
  },
  icon: { fontSize: 42 },
  emptyTitle: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    writingDirection: "rtl"
  },
  emptyBody: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    writingDirection: "rtl"
  }
});
