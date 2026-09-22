import { type Href, router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ToolCard } from "@/components/ToolCard";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";

export default function ToolsScreen() {
  const {
    language,
    resolvedTheme,
    showToolGuidance,
    setShowToolGuidance
  } = useAppPreferences();
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

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: showToolGuidance }}
          accessibilityLabel="نمایش راهنمای ابزارها"
          onPress={() => setShowToolGuidance(!showToolGuidance)}
          style={[
            styles.guidanceToggle,
            {
              backgroundColor: colors.surface,
              borderColor: showToolGuidance ? colors.primary : colors.border
            }
          ]}
        >
          <View
            style={[
              styles.checkbox,
              {
                borderColor: showToolGuidance ? colors.primary : colors.border,
                backgroundColor: showToolGuidance ? colors.primary : colors.surface
              }
            ]}
          >
            {showToolGuidance ? <Text style={styles.checkmark}>✓</Text> : null}
          </View>
          <View style={styles.guidanceTextWrap}>
            <Text style={[styles.guidanceTitle, { color: colors.text }]}>
              راهنمای استفاده از ابزارها
            </Text>
            <Text style={[styles.guidanceSubtitle, { color: colors.muted }]}>
              هنگام باز کردن هر ابزار، توضیح ورودی‌ها و نتیجه را نمایش بده
            </Text>
          </View>
        </Pressable>

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
    paddingTop: 34,
    paddingBottom: 110
  },
  title: { fontSize: 27, fontWeight: "800", textAlign: "right", writingDirection: "rtl" },
  subtitle: { fontSize: 16, marginTop: 6, textAlign: "right", writingDirection: "rtl" },
  guidanceToggle: {
    marginTop: 18,
    minHeight: 72,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 18,
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900"
  },
  guidanceTextWrap: {
    flex: 1
  },
  guidanceTitle: {
    fontSize: 15,
    fontWeight: "800",
    textAlign: "right",
    writingDirection: "rtl"
  },
  guidanceSubtitle: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "right",
    writingDirection: "rtl"
  },
  list: { marginTop: 20, gap: 12 }
});
