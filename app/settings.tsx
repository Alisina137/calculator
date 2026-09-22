import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { useCalculator } from "@/context/CalculatorContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";
import type { AppLanguage, NumeralStyle, ThemePreference } from "@/context/AppPreferencesContext";

export default function SettingsScreen() {
  const prefs = useAppPreferences();
  const { clearHistory } = useCalculator();
  const colors = colorsFor(prefs.resolvedTheme);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={[styles.back, { backgroundColor: colors.surface }]}>
            <Text style={[styles.backText, { color: colors.text }]}>→</Text>
          </Pressable>
          <Text style={[styles.title, { color: colors.text }]}>{t(prefs.language, "settings")}</Text>
        </View>

        <SettingGroup title={t(prefs.language, "language")} theme={prefs.resolvedTheme}>
          <OptionRow<AppLanguage>
            value={prefs.language}
            options={[
              ["dari", t(prefs.language, "dari")],
              ["persian", t(prefs.language, "persian")]
            ]}
            onChange={prefs.setLanguage}
            theme={prefs.resolvedTheme}
          />
        </SettingGroup>

        <SettingGroup title={t(prefs.language, "numerals")} theme={prefs.resolvedTheme}>
          <OptionRow<NumeralStyle>
            value={prefs.numeralStyle}
            options={[
              ["persian", t(prefs.language, "persianDigits")],
              ["latin", t(prefs.language, "latinDigits")]
            ]}
            onChange={prefs.setNumeralStyle}
            theme={prefs.resolvedTheme}
          />
        </SettingGroup>

        <SettingGroup title={t(prefs.language, "appearance")} theme={prefs.resolvedTheme}>
          <OptionRow<ThemePreference>
            value={prefs.themePreference}
            options={[
              ["system", t(prefs.language, "system")],
              ["light", t(prefs.language, "light")],
              ["dark", t(prefs.language, "dark")]
            ]}
            onChange={prefs.setThemePreference}
            theme={prefs.resolvedTheme}
          />
        </SettingGroup>

        <View style={[styles.group, { backgroundColor: colors.surface }]}>
          <View style={styles.switchRow}>
            <Switch value={prefs.hapticsEnabled} onValueChange={prefs.setHapticsEnabled} />
            <Text style={[styles.groupTitle, { color: colors.text }]}>{t(prefs.language, "haptics")}</Text>
          </View>
        </View>

        <View style={[styles.group, { backgroundColor: colors.surface }]}>
          <Text style={[styles.groupTitle, { color: colors.text }]}>
            {t(prefs.language, "history")}
          </Text>
          <View style={styles.groupBody}>
            <Pressable
              onPress={() => void clearHistory()}
              style={[
                styles.option,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border
                }
              ]}
            >
              <Text style={[styles.optionText, { color: colors.danger }]}>
                {t(prefs.language, "clearHistory")}
              </Text>
            </Pressable>
          </View>
        </View>

        <SettingGroup title={t(prefs.language, "privacy")} theme={prefs.resolvedTheme}>
          <Text style={[styles.body, { color: colors.muted }]}>{t(prefs.language, "privacyBody")}</Text>
        </SettingGroup>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingGroup({ title, theme, children }: { title: string; theme: "light" | "dark"; children: React.ReactNode }) {
  const colors = colorsFor(theme);
  return (
    <View style={[styles.group, { backgroundColor: colors.surface }]}>
      <Text style={[styles.groupTitle, { color: colors.text }]}>{title}</Text>
      <View style={styles.groupBody}>{children}</View>
    </View>
  );
}

function OptionRow<T extends string>({
  value,
  options,
  onChange,
  theme
}: {
  value: T;
  options: readonly (readonly [T, string])[];
  onChange: (value: T) => void;
  theme: "light" | "dark";
}) {
  const colors = colorsFor(theme);
  return (
    <View style={styles.options}>
      {options.map(([optionValue, label]) => {
        const selected = optionValue === value;
        return (
          <Pressable
            key={optionValue}
            onPress={() => onChange(optionValue)}
            style={[
              styles.option,
              {
                backgroundColor: selected ? colors.primarySoft : colors.background,
                borderColor: selected ? colors.primary : colors.border
              }
            ]}
          >
            <Text style={[styles.optionText, { color: selected ? colors.primary : colors.text }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 18, paddingBottom: 36, direction: "rtl", gap: 14 },
  header: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
  title: { fontSize: 27, fontWeight: "800", writingDirection: "rtl" },
  back: { width: 46, height: 46, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  backText: { fontSize: 24, fontWeight: "700" },
  group: { padding: 18, borderRadius: 24 },
  groupTitle: { fontSize: 17, fontWeight: "800", textAlign: "right", writingDirection: "rtl" },
  groupBody: { marginTop: 14 },
  options: { gap: 9 },
  option: { minHeight: 48, borderRadius: 15, borderWidth: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 12 },
  optionText: { fontSize: 15, fontWeight: "700", textAlign: "center", writingDirection: "rtl" },
  switchRow: { minHeight: 48, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  body: { fontSize: 15, lineHeight: 23, textAlign: "right", writingDirection: "rtl" }
});
