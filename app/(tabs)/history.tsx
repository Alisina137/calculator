import { router } from "expo-router";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { AnimatedPressable } from "@/components/AnimatedPressable";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { useCalculator } from "@/context/CalculatorContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";
import { displayDigits } from "@/utils/numerals";
import { rowDirection, textAlignment, textDirection } from "@/i18n/languages";

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
  const row = rowDirection(language);
  const align = textAlignment(language);
  const direction = textDirection(language);

  const goToCalculator = () => {
    router.replace("/");
  };

  const confirmClearHistory = () => {
    Alert.alert(
      t(language, "confirmClearHistoryTitle"),
      t(language, "confirmClearHistoryBody"),
      [
        { text: t(language, "cancel"), style: "cancel" },
        {
          text: t(language, "confirm"),
          style: "destructive",
          onPress: () => void clearHistory()
        }
      ]
    );
  };

  if (history.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
        <View style={styles.page}>
          <Text style={[styles.title, { color: colors.text, textAlign: align, writingDirection: direction }]}>{t(language, "history")}</Text>
          <View style={[styles.emptyCard, { backgroundColor: colors.surface }]}>
            <Text style={styles.icon}>↺</Text>
            <Text style={[styles.emptyTitle, { color: colors.text, writingDirection: direction }]}>
              {t(language, "historyEmptyTitle")}
            </Text>
            <Text style={[styles.emptyBody, { color: colors.muted, writingDirection: direction }]}>
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
        <View style={[styles.header, { flexDirection: row }]}>
          <Text style={[styles.title, { color: colors.text, textAlign: align, writingDirection: direction }]}>{t(language, "history")}</Text>
          <AnimatedPressable
            accessibilityRole="button"
            accessibilityLabel={t(language, "clearAll")}
            onPress={confirmClearHistory}
            style={({ pressed }) => [
              styles.clearButton,
              {
                backgroundColor: pressed ? colors.primarySoft : colors.surface,
                borderColor: pressed ? colors.primary : colors.border,
                opacity: 1
              }
            ]}
          >
            <Text style={[styles.clearText, { color: colors.danger, writingDirection: direction }]}>
              {t(language, "clearAll")}
            </Text>
          </AnimatedPressable>
        </View>

        <ScrollView contentContainerStyle={styles.list}>
          {history.map((entry) => {
            const dateText = displayDigits(
              new Date(entry.createdAt).toLocaleString(
                language === "fa" ? "fa-IR-u-nu-latn" : "en-US-u-nu-latn"
              ),
              numeralStyle
            );

            return (
              <View
                key={entry.id}
                style={[styles.card, { backgroundColor: colors.surface }]}
              >
                <AnimatedPressable
                  accessibilityRole="button"
                  accessibilityLabel={t(language, "reuseResult")}
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
                  <Text style={[styles.date, { color: colors.muted, textAlign: align, writingDirection: direction }]}>
                    {dateText}
                  </Text>
                </AnimatedPressable>

                <View style={[styles.actions, { flexDirection: row }]}>
                  <AnimatedPressable
                    accessibilityRole="button"
                    accessibilityLabel={t(language, "reuseExpression")}
                    onPress={() => {
                      reuseExpression(entry);
                      goToCalculator();
                    }}
                    style={({ pressed }) => [
                      styles.actionButton,
                      {
                        borderColor: pressed ? colors.primary : colors.border,
                        backgroundColor: pressed ? colors.primarySoft : "transparent"
                      }
                    ]}
                  >
                    <Text style={[styles.actionText, { color: colors.primary, writingDirection: direction }]}>
                      {t(language, "reuseExpression")}
                    </Text>
                  </AnimatedPressable>

                  <AnimatedPressable
                    accessibilityRole="button"
                    accessibilityLabel={t(language, "delete")}
                    onPress={() => void deleteHistory(entry.id)}
                    style={({ pressed }) => [
                      styles.actionButton,
                      {
                        borderColor: pressed ? colors.primary : colors.border,
                        backgroundColor: pressed ? colors.primarySoft : "transparent"
                      }
                    ]}
                  >
                    <Text style={[styles.actionText, { color: colors.danger, writingDirection: direction }]}>
                      {t(language, "delete")}
                    </Text>
                  </AnimatedPressable>
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
  page: {
    flex: 1,
    paddingHorizontal: 18,
    paddingBottom: 18,
    paddingTop: 38
  },
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
    textAlign: "left",
    writingDirection: "ltr"
  },
  result: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: "800",
    textAlign: "left",
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
