import { router } from "expo-router";
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { AnimatedPressable } from "@/components/AnimatedPressable";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { useCalculator } from "@/context/CalculatorContext";
import { t } from "@/i18n/translations";
import { isRtlLanguage, rowDirection, supportedLanguages, textAlignment, textDirection } from "@/i18n/languages";
import { numeralStyleOptionsForLanguage } from "@/i18n/numeralStyles";
import { colorsFor } from "@/theme/colors";
import type { AppLanguage, NumeralStyle, ThemePreference } from "@/context/AppPreferencesContext";
import { useState } from "react";

export default function SettingsScreen() {
  const prefs = useAppPreferences();
  const { clearHistory } = useCalculator();
  const colors = colorsFor(prefs.resolvedTheme);
  const rtl = isRtlLanguage(prefs.language);
  const align = textAlignment(prefs.language);
  const direction = textDirection(prefs.language);
  const row = rowDirection(prefs.language);

  const confirmClearHistory = () => {
    Alert.alert(
      t(prefs.language, "confirmClearHistoryTitle"),
      t(prefs.language, "confirmClearHistoryBody"),
      [
        { text: t(prefs.language, "cancel"), style: "cancel" },
        {
          text: t(prefs.language, "confirm"),
          style: "destructive",
          onPress: () => void clearHistory()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.header, { flexDirection: row }]}>
          <AnimatedPressable
            accessibilityRole="button"
            accessibilityLabel="بازگشت"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.back, { backgroundColor: pressed ? colors.primarySoft : colors.surface }]}
          >
            <Text style={[styles.backText, { color: colors.text }]}>{rtl ? "→" : "←"}</Text>
          </AnimatedPressable>
          <Text style={[styles.title, { color: colors.text, textAlign: align, writingDirection: direction }]}>{t(prefs.language, "settings")}</Text>
        </View>

        <SettingGroup title={t(prefs.language, "language")} theme={prefs.resolvedTheme} language={prefs.language}>
          <LanguageSelect
            value={prefs.language}
            onChange={prefs.setLanguage}
            theme={prefs.resolvedTheme}
            language={prefs.language}
          />
        </SettingGroup>

        <SettingGroup title={t(prefs.language, "numerals")} theme={prefs.resolvedTheme} language={prefs.language}>
          <OptionRow<NumeralStyle>
            value={prefs.numeralStyle}
            options={numeralStyleOptionsForLanguage(prefs.language).map(
              (item) => [item.id, `${item.label} ${item.sample}`] as const
            )}
            onChange={prefs.setNumeralStyle}
            theme={prefs.resolvedTheme}
            language={prefs.language}
          />
        </SettingGroup>

        <SettingGroup title={t(prefs.language, "appearance")} theme={prefs.resolvedTheme} language={prefs.language}>
          <OptionRow<ThemePreference>
            value={prefs.themePreference}
            options={[
              ["system", t(prefs.language, "system")],
              ["light", t(prefs.language, "light")],
              ["dark", t(prefs.language, "dark")]
            ]}
            onChange={prefs.setThemePreference}
            theme={prefs.resolvedTheme}
            language={prefs.language}
          />
        </SettingGroup>

        <View style={[styles.group, { backgroundColor: colors.surface }]}>
          <View style={[styles.switchRow, { flexDirection: row }]}>
            <Switch value={prefs.hapticsEnabled} onValueChange={prefs.setHapticsEnabled} />
            <Text style={[styles.groupTitle, { color: colors.text, textAlign: align, writingDirection: direction }]}>{t(prefs.language, "haptics")}</Text>
          </View>
        </View>

        <View style={[styles.group, { backgroundColor: colors.surface }]}>
          <Text style={[styles.groupTitle, { color: colors.text, textAlign: align, writingDirection: direction }]}>
            {t(prefs.language, "history")}
          </Text>
          <View style={styles.groupBody}>
            <AnimatedPressable
              accessibilityRole="button"
              accessibilityLabel={t(prefs.language, "clearHistory")}
              onPress={confirmClearHistory}
              style={({ pressed }) => [
                styles.option,
                {
                  backgroundColor: pressed ? colors.primarySoft : colors.background,
                  borderColor: pressed ? colors.primary : colors.border
                }
              ]}
            >
              <Text style={[styles.optionText, { color: colors.danger, writingDirection: direction }]}>
                {t(prefs.language, "clearHistory")}
              </Text>
            </AnimatedPressable>
          </View>
        </View>

        <SettingGroup title={t(prefs.language, "privacy")} theme={prefs.resolvedTheme} language={prefs.language}>
          <Text style={[styles.body, { color: colors.muted, textAlign: align, writingDirection: direction }]}>{t(prefs.language, "privacyBody")}</Text>
        </SettingGroup>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingGroup({ title, theme, language, children }: { title: string; theme: "light" | "dark"; language: AppLanguage; children: React.ReactNode }) {
  const colors = colorsFor(theme);
  const align = textAlignment(language);
  const direction = textDirection(language);
  return (
    <View style={[styles.group, { backgroundColor: colors.surface }]}>
      <Text style={[styles.groupTitle, { color: colors.text, textAlign: align, writingDirection: direction }]}>{title}</Text>
      <View style={styles.groupBody}>{children}</View>
    </View>
  );
}

function LanguageSelect({
  value,
  onChange,
  theme,
  language
}: {
  value: AppLanguage;
  onChange: (value: AppLanguage) => void;
  theme: "light" | "dark";
  language: AppLanguage;
}) {
  const [open, setOpen] = useState(false);
  const colors = colorsFor(theme);
  const direction = textDirection(language);
  const row = rowDirection(language);
  const selectedLanguage =
    supportedLanguages.find((item) => item.id === value) ?? supportedLanguages[0];

  return (
    <>
      <AnimatedPressable
        accessibilityRole="button"
        accessibilityLabel={selectedLanguage.nativeName}
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.languageSelect,
          {
            flexDirection: row,
            backgroundColor: pressed ? colors.primarySoft : colors.background,
            borderColor: open || pressed ? colors.primary : colors.border
          }
        ]}
      >
        <Text
          style={[
            styles.languageSelectText,
            { color: colors.text, writingDirection: direction }
          ]}
        >
          {selectedLanguage.nativeName}
        </Text>
        <Text style={[styles.languageChevron, { color: colors.muted }]}>⌄</Text>
      </AnimatedPressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.languageOverlay}>
          <View
            style={[
              styles.languageModal,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border
              }
            ]}
          >
            <View style={[styles.languageModalHeader, { flexDirection: row }]}>
              <Text
                style={[
                  styles.languageModalTitle,
                  { color: colors.text, writingDirection: direction }
                ]}
              >
                {t(language, "language")}
              </Text>
              <AnimatedPressable
                accessibilityRole="button"
                accessibilityLabel={t(language, "cancel")}
                onPress={() => setOpen(false)}
                style={styles.languageClose}
              >
                <Text style={[styles.languageCloseText, { color: colors.muted }]}>×</Text>
              </AnimatedPressable>
            </View>

            <ScrollView
              style={styles.languageList}
              contentContainerStyle={styles.languageListContent}
              showsVerticalScrollIndicator={false}
            >
              {supportedLanguages.map((item) => {
                const selected = item.id === value;
                return (
                  <AnimatedPressable
                    key={item.id}
                    accessibilityRole="button"
                    accessibilityLabel={item.nativeName}
                    accessibilityState={{ selected }}
                    onPress={() => {
                      onChange(item.id);
                      setOpen(false);
                    }}
                    style={({ pressed }) => [
                      styles.languageOption,
                      {
                        flexDirection: row,
                        backgroundColor:
                          selected || pressed ? colors.primarySoft : colors.background,
                        borderColor:
                          selected || pressed ? colors.primary : colors.border
                      }
                    ]}
                  >
                    <Text
                      style={[
                        styles.languageOptionText,
                        {
                          color: selected ? colors.primary : colors.text,
                          writingDirection: item.rtl ? "rtl" : "ltr"
                        }
                      ]}
                    >
                      {item.nativeName}
                    </Text>
                    {selected ? (
                      <Text style={[styles.languageCheck, { color: colors.primary }]}>✓</Text>
                    ) : null}
                  </AnimatedPressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

function OptionRow<T extends string>({
  value,
  options,
  onChange,
  theme,
  language
}: {
  value: T;
  options: readonly (readonly [T, string])[];
  onChange: (value: T) => void;
  theme: "light" | "dark";
  language: AppLanguage;
}) {
  const colors = colorsFor(theme);
  const direction = textDirection(language);
  return (
    <View style={styles.options}>
      {options.map(([optionValue, label]) => {
        const selected = optionValue === value;
        return (
          <AnimatedPressable
            key={optionValue}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected }}
            onPress={() => onChange(optionValue)}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: selected || pressed ? colors.primarySoft : colors.background,
                borderColor: selected || pressed ? colors.primary : colors.border
              }
            ]}
          >
            <Text style={[styles.optionText, { color: selected ? colors.primary : colors.text, writingDirection: direction }]}>
              {selected ? `✓ ${label}` : label}
            </Text>
          </AnimatedPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 18, paddingBottom: 36, gap: 14 },
  header: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
  title: { fontSize: 27, fontWeight: "800", writingDirection: "rtl" },
  back: { width: 46, height: 46, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  backText: { fontSize: 24, fontWeight: "700" },
  group: { padding: 18, borderRadius: 24 },
  groupTitle: { fontSize: 17, fontWeight: "800", textAlign: "right", writingDirection: "rtl" },
  groupBody: { marginTop: 14 },
  options: { gap: 9 },
  languageSelect: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "space-between"
  },
  languageSelectText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700"
  },
  languageChevron: {
    fontSize: 22,
    fontWeight: "700"
  },
  languageOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.42)",
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  languageModal: {
    width: "100%",
    maxWidth: 440,
    maxHeight: "78%",
    borderWidth: 1,
    borderRadius: 24,
    padding: 16
  },
  languageModalHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  languageModalTitle: {
    fontSize: 20,
    fontWeight: "800"
  },
  languageClose: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  languageCloseText: {
    fontSize: 30,
    lineHeight: 32
  },
  languageList: {
    maxHeight: 470
  },
  languageListContent: {
    gap: 8,
    paddingBottom: 4
  },
  languageOption: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "space-between"
  },
  languageOptionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700"
  },
  languageCheck: {
    fontSize: 17,
    fontWeight: "900"
  },
  option: { minHeight: 48, borderRadius: 15, borderWidth: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 12 },
  optionText: { fontSize: 15, fontWeight: "700", textAlign: "center", writingDirection: "rtl" },
  switchRow: { minHeight: 48, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  body: { fontSize: 15, lineHeight: 23, textAlign: "right", writingDirection: "rtl" }
});
