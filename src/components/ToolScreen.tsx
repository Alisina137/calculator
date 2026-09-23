import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
   ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useAppPreferences,
  type ResolvedTheme,
  type ToolGuidanceId
} from "@/context/AppPreferencesContext";
import type { ToolGuide } from "@/i18n/toolGuidance";
import { colorsFor } from "@/theme/colors";
import { AnimatedPressable } from "@/components/AnimatedPressable";
import { displayDigits, normalizeDigits } from "@/utils/numerals";
import { rowDirection, textAlignment, textDirection } from "@/i18n/languages";

export function ToolScreen({
  title,
  subtitle,
  theme,
  guide,
  guideId,
  children
}: {
  title: string;
  subtitle?: string;
  theme: ResolvedTheme;
  guide?: ToolGuide;
  guideId?: ToolGuidanceId;
  children: ReactNode;
}) {
  const colors = colorsFor(theme);
  const {
    toolGuidance,
    setToolGuidanceEnabled,
    language
  } = useAppPreferences();
  const showToolGuidance = guideId ? toolGuidance[guideId] : false;
  const align = textAlignment(language);
  const direction = textDirection(language);
  const row = rowDirection(language);
  const guideLabels =
    language === "fa"
      ? { title: "راهنمای استفاده", inputs: "چه چیزی وارد کنید", result: "چه نتیجه‌ای می‌گیرید" }
      : { title: "How to use", inputs: "What to enter", result: "What you get" };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { flexDirection: row }]}>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: colors.text, textAlign: align, writingDirection: direction }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: colors.muted, textAlign: align, writingDirection: direction }]}>{subtitle}</Text>
          ) : null}
        </View>
        <AnimatedPressable
          accessibilityRole="button"
          accessibilityLabel="بازگشت"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            {
              backgroundColor: pressed ? colors.primarySoft : colors.surface,
              borderColor: pressed ? colors.primary : colors.border
            }
          ]}
        >
          <SymbolView
            name={direction === "rtl"
              ? { ios: "chevron.right", android: "arrow_forward", web: "arrow_forward" }
              : { ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
            size={22}
            tintColor={colors.text}
          />
        </AnimatedPressable>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {guide && guideId ? (
          <AnimatedPressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: showToolGuidance }}
            accessibilityLabel={language === "fa" ? "نمایش راهنمای این ابزار" : "Show tool guide"}
            onPress={() =>
              setToolGuidanceEnabled(guideId, !showToolGuidance)
            }
            style={[
              styles.guideToggle,
              { flexDirection: row },
              {
                backgroundColor: colors.surface,
                borderColor: showToolGuidance ? colors.primary : colors.border
              }
            ]}
          >
            <View
              style={[
                styles.guideCheckbox,
                {
                  borderColor: showToolGuidance ? colors.primary : colors.border,
                  backgroundColor: showToolGuidance
                    ? colors.primary
                    : colors.surface
                }
              ]}
            >
              {showToolGuidance ? (
                <Text style={styles.guideCheckmark}>✓</Text>
              ) : null}
            </View>
            <View style={styles.guideToggleTextWrap}>
              <Text style={[styles.guideToggleTitle, { color: colors.text, textAlign: align, writingDirection: direction }]}>
                {language === "fa" ? "راهنمای این ابزار" : "Tool guide"}
              </Text>
              <Text
                style={[styles.guideToggleSubtitle, { color: colors.muted, textAlign: align, writingDirection: direction }]}
              >
                {showToolGuidance
                  ? language === "fa" ? "راهنما نمایش داده می‌شود" : "Guide is visible"
                  : language === "fa" ? "برای دیدن توضیحات این ابزار فعال کنید" : "Enable to see instructions"}
              </Text>
            </View>
          </AnimatedPressable>
        ) : null}

        {showToolGuidance && guide ? (
          <View
            style={[
              styles.guideCard,
              {
                backgroundColor: colors.primarySoft,
                borderColor: colors.primary
              }
            ]}
          >
            <Text style={[styles.guideTitle, { color: colors.primary, textAlign: align, writingDirection: direction }]}>
              {guideLabels.title}
            </Text>
            <Text style={[styles.guideBody, { color: colors.text, textAlign: align, writingDirection: direction }]}>
              {guide.purpose}
            </Text>

            <Text style={[styles.guideSectionTitle, { color: colors.text, textAlign: align, writingDirection: direction }]}>
              {guideLabels.inputs}
            </Text>
            {guide.inputs.map((item, index) => (
              <Text
                key={item}
                style={[styles.guideBody, { color: colors.text, textAlign: align, writingDirection: direction }]}
              >
                {index + 1}. {item}
              </Text>
            ))}

            <Text style={[styles.guideSectionTitle, { color: colors.text, textAlign: align, writingDirection: direction }]}>
              {guideLabels.result}
            </Text>
            <Text style={[styles.guideBody, { color: colors.text, textAlign: align, writingDirection: direction }]}>
              {guide.result}
            </Text>
          </View>
        ) : null}

        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function ToolField({
  label,
  value,
  onChangeText,
  placeholder,
  theme,
  keyboardType = "decimal-pad"
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  theme: ResolvedTheme;
  keyboardType?: "decimal-pad" | "number-pad" | "default";
}) {
  const colors = colorsFor(theme);
  const { numeralStyle, language } = useAppPreferences();
  const align = textAlignment(language);
  const direction = textDirection(language);
  const inputRef = useRef<TextInput>(null);
  const [displayValue, setDisplayValue] = useState(() =>
    displayDigits(value, numeralStyle)
  );
  const displayPlaceholder = placeholder
    ? displayDigits(placeholder, numeralStyle)
    : undefined;

  useEffect(() => {
    const localized = displayDigits(value, numeralStyle);
    setDisplayValue(localized);
    inputRef.current?.setNativeProps({ text: localized });
  }, [value, numeralStyle]);

  const handleChangeText = (text: string) => {
    const normalized = normalizeDigits(text);
    const localized = displayDigits(normalized, numeralStyle);

    setDisplayValue(localized);
    inputRef.current?.setNativeProps({ text: localized });
    onChangeText(normalized);
  };

  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.fieldLabel, { color: colors.text, textAlign: align, writingDirection: direction }]}>{label}</Text>
      <TextInput
        ref={inputRef}
        value={displayValue}
        onChangeText={handleChangeText}
        placeholder={displayPlaceholder}
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        keyboardType={keyboardType}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text
          }
        ]}
      />
    </View>
  );
}

export function ChoiceRow<T extends string>({
  options,
  value,
  onChange,
  theme
}: {
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  theme: ResolvedTheme;
}) {
  const colors = colorsFor(theme);
  const { language } = useAppPreferences();
  const row = rowDirection(language);
  const direction = textDirection(language);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.choiceRow, { flexDirection: row }]}
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <AnimatedPressable
            key={option.id}
            accessibilityRole="button"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.id)}
            style={({ pressed }) => [
              styles.choice,
              {
                backgroundColor: active || pressed ? colors.primarySoft : colors.surface,
                borderColor: active || pressed ? colors.primary : colors.border,
                opacity: 1
              }
            ]}
          >
            <Text
              style={[
                styles.choiceText,
                { color: active ? colors.primary : colors.text, writingDirection: direction }
              ]}
            >
              {active ? `✓ ${option.label}` : option.label}
            </Text>
          </AnimatedPressable>
        );
      })}
    </ScrollView>
  );
}

export function ToolSection({
  title,
  theme,
  children
}: {
  title?: string;
  theme: ResolvedTheme;
  children: ReactNode;
}) {
  const colors = colorsFor(theme);
  const { language } = useAppPreferences();
  const align = textAlignment(language);
  const direction = textDirection(language);
  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      {title ? (
        <Text style={[styles.sectionTitle, { color: colors.text, textAlign: align, writingDirection: direction }]}>{title}</Text>
      ) : null}
      {children}
    </View>
  );
}

export function ResultCard({
  title,
  rows,
  theme
}: {
  title?: string;
  rows: { label: string; value: string; emphasis?: boolean }[];
  theme: ResolvedTheme;
}) {
  const colors = colorsFor(theme);
  const { language } = useAppPreferences();
  const align = textAlignment(language);
  const direction = textDirection(language);
  const row = rowDirection(language);
  const resolvedTitle = title ?? (language === "fa" ? "نتیجه" : "Result");

  return (
    <View
      style={[
        styles.resultCard,
        { backgroundColor: colors.primarySoft, borderColor: colors.primary }
      ]}
    >
      <Text style={[styles.resultTitle, { color: colors.primary, textAlign: align, writingDirection: direction }]}>{resolvedTitle}</Text>
      {rows.map((row, index) => (
        <View
          key={row.label + index}
          style={[
            styles.resultRow,
            { flexDirection: row },
            index > 0 ? { borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth } : null
          ]}
        >
          <Text style={[styles.resultLabel, { color: colors.text, textAlign: align, writingDirection: direction }]}>{row.label}</Text>
          <Text
            selectable
            style={[
              styles.resultValue,
              row.emphasis ? styles.resultValueEmphasis : null,
              { color: colors.text }
            ]}
          >
            {row.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function ToolMessage({
  text,
  theme,
  danger = false
}: {
  text: string;
  theme: ResolvedTheme;
  danger?: boolean;
}) {
  const colors = colorsFor(theme);
  const { language } = useAppPreferences();
  const align = textAlignment(language);
  const direction = textDirection(language);
  return (
    <Text
      style={[
        styles.message,
        { color: danger ? colors.danger : colors.muted, textAlign: align, writingDirection: direction }
      ]}
    >
      {text}
    </Text>
  );
}

export function PrimaryButton({
  label,
  onPress,
  theme
}: {
  label: string;
  onPress: () => void;
  theme: ResolvedTheme;
}) {
  const colors = colorsFor(theme);
  const { language } = useAppPreferences();
  const direction = textDirection(language);
  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        { backgroundColor: pressed ? colors.primarySoft : colors.primary }
      ]}
    >
      <Text style={[styles.primaryButtonText, { writingDirection: direction }]}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    minHeight: 72,
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  headerText: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "right",
    writingDirection: "rtl"
  },
  subtitle: {
    marginTop: 3,
    fontSize: 13,
    textAlign: "right",
    writingDirection: "rtl"
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    padding: 18,
    paddingTop: 6,
    paddingBottom: 40,
    gap: 14,
  },
  guideToggle: {
    minHeight: 68,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1,
    borderRadius: 18,
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12
  },
  guideCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  guideCheckmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900"
  },
  guideToggleTextWrap: {
    flex: 1
  },
  guideToggleTitle: {
    fontSize: 15,
    fontWeight: "800",
    textAlign: "right",
    writingDirection: "rtl"
  },
  guideToggleSubtitle: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "right",
    writingDirection: "rtl"
  },
  guideCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 8
  },
  guideTitle: {
    fontSize: 17,
    fontWeight: "900",
    textAlign: "right",
    writingDirection: "rtl"
  },
  guideSectionTitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "right",
    writingDirection: "rtl"
  },
  guideBody: {
    fontSize: 13,
    lineHeight: 21,
    textAlign: "right",
    writingDirection: "rtl"
  },
  section: {
    borderRadius: 20,
    padding: 16,
    gap: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    textAlign: "right",
    writingDirection: "rtl"
  },
  fieldWrap: { gap: 7 },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "right",
    writingDirection: "rtl"
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
    fontSize: 18,
    textAlign: "left",
    writingDirection: "ltr"
  },
  choiceRow: {
    flexDirection: "row-reverse",
    gap: 8,
    paddingVertical: 2
  },
  choice: {
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  choiceText: {
    fontSize: 14,
    fontWeight: "700",
    writingDirection: "rtl"
  },
  resultCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "800",
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: 6
  },
  resultRow: {
    minHeight: 49,
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  resultLabel: {
    flex: 1,
    fontSize: 14,
    textAlign: "right",
    writingDirection: "rtl"
  },
  resultValue: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "left",
    writingDirection: "ltr"
  },
  resultValueEmphasis: { fontSize: 23, fontWeight: "800" },
  message: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: "right",
    writingDirection: "rtl"
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    writingDirection: "rtl"
  }
});
