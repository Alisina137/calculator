import { type Href, router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ToolCard } from "@/components/ToolCard";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";

export default function ToolsScreen() {
  const { language, resolvedTheme } = useAppPreferences();
  const colors = colorsFor(resolvedTheme);

  const tools = [
    ["٪", "percentage", "percentageDesc", "/tools/percentage"],
    ["🏷", "discount", "discountDesc", "/tools/discount"],
    ["⇄", "unitConverter", "unitConverterDesc", "/tools/unit-converter"],
    ["🎂", "age", "ageDesc", "/tools/age"],
    ["▣", "date", "dateDesc", "/tools/date"]
  ] as const;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{t(language, "tools")}</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>{t(language, "everydayTools")}</Text>
        <View style={styles.list}>
          {tools.map(([icon, title, description, href]) => (
            <ToolCard
              key={title}
              icon={icon}
              title={t(language, title)}
              subtitle={t(language, description)}
              theme={resolvedTheme}
              onPress={() => router.push(href as Href)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingLeft: 18,
    paddingRight: 24,
    paddingTop: 28,
    paddingBottom: 110
  },
  title: { fontSize: 27, fontWeight: "800", textAlign: "right", writingDirection: "rtl" },
  subtitle: { fontSize: 16, marginTop: 6, textAlign: "right", writingDirection: "rtl" },
  list: { marginTop: 20, gap: 12 }
});
