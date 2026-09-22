import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";

export default function HistoryScreen() {
  const { language, resolvedTheme } = useAppPreferences();
  const colors = colorsFor(resolvedTheme);

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

const styles = StyleSheet.create({
  safe: { flex: 1 },
  page: { flex: 1, padding: 18, direction: "rtl" },
  title: { fontSize: 27, fontWeight: "800", textAlign: "right", writingDirection: "rtl" },
  emptyCard: { marginTop: "45%", borderRadius: 24, padding: 24, alignItems: "center" },
  icon: { fontSize: 42 },
  emptyTitle: { marginTop: 14, fontSize: 20, fontWeight: "800", textAlign: "center", writingDirection: "rtl" },
  emptyBody: { marginTop: 8, fontSize: 15, lineHeight: 23, textAlign: "center", writingDirection: "rtl" }
});
