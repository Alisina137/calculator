import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import type { ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppPreferences, type ResolvedTheme } from "@/context/AppPreferencesContext";
import type { ToolGuide } from "@/i18n/toolGuidance";
import { colorsFor } from "@/theme/colors";
import { displayDigits, normalizeDigits } from "@/utils/numerals";

export function ToolScreen({
  title,
  subtitle,
  theme,
  guide,
  children
}: {
  title: string;
  subtitle?: string;
  theme: ResolvedTheme;
  guide?: ToolGuide;
  children: ReactNode;
}) {
  const colors = colorsFor(theme);
  const { showToolGuidance, language } = useAppPreferences();
  const guideLabels =
    language === "dari"
      ? {
          title: "راهنمای استفاده",
          inputs: "چه چیزی وارد کنید",
          result: "چه نتیجه‌ای می‌گیرید"
        }
      : {
          title: "راهنمای استفاده",
          inputs: "چه چیزی وارد کنید",
          result: "چه نتیجه‌ای می‌گیرید"
        };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text>
          ) : null}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="بازگشت"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            {
              backgroundColor: pressed ? colors.key : colors.surface,
              borderColor: colors.border
            }
          ]}
        >
          <SymbolView
            name={{ ios: "chevron.right", android: "arrow_back", web: "arrow_back" }}
            size={22}
            tintColor={colors.text}
          />
        </Pressable>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
            <Text style={[styles.guideTitle, { color: colors.primary }]}>
              {guideLabels.title}
            </Text>
            <Text style={[styles.guideBody, { color: colors.text }]}>
              {guide.purpose}
            </Text>

            <Text style={[styles.guideSectionTitle, { color: colors.text }]}>
              {guideLabels.inputs}
            </Text>
            {guide.inputs.map((item, index) => (
              <Text
                key={item}
                style={[styles.guideBody, { color: colors.text }]}
              >
                {index + 1}. {item}
              </Text>
            ))}

            <Text style={[styles.guideSectionTitle, { color: colors.text }]}>
              {guideLabels.result}
            </Text>
            <Text style={[styles.guideBody, { color: colors.text }]}>
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
  const { numeralStyle } = useAppPreferences();
  const displayValue = displayDigits(value, numeralStyle);
  const displayPlaceholder = placeholder
    ? displayDigits(placeholder, numeralStyle)
    : undefined;

  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.fieldLabel, { color: colors.text }]}>{label}</Text>
      <TextInput
        value={displayValue}
        onChangeText={(text) => onChangeText(normalizeDigits(text))}
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

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.choiceRow}
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <Pressable
            key={option.id}
            accessibilityRole="button"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.id)}
            style={({ pressed }) => [
              styles.choice,
              {
                backgroundColor: active ? colors.primarySoft : colors.surface,
                borderColor: active ? colors.primary : colors.border,
                opacity: pressed ? 0.78 : 1
              }
            ]}
          >
            <Text
              style={[
                styles.choiceText,
                { color: active ? colors.primary : colors.text }
              ]}
            >
              {active ? `✓ ${option.label}` : option.label}
            </Text>
          </Pressable>
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
  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      {title ? (
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      ) : null}
      {children}
    </View>
  );
}

export function ResultCard({
  title = "نتیجه",
  rows,
  theme
}: {
  title?: string;
  rows: { label: string; value: string; emphasis?: boolean }[];
  theme: ResolvedTheme;
}) {
  const colors = colorsFor(theme);

  return (
    <View
      style={[
        styles.resultCard,
        { backgroundColor: colors.primarySoft, borderColor: colors.primary }
      ]}
    >
      <Text style={[styles.resultTitle, { color: colors.primary }]}>{title}</Text>
      {rows.map((row, index) => (
        <View
          key={row.label + index}
          style={[
            styles.resultRow,
            index > 0 ? { borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth } : null
          ]}
        >
          <Text style={[styles.resultLabel, { color: colors.text }]}>{row.label}</Text>
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
  return (
    <Text
      style={[
        styles.message,
        { color: danger ? colors.danger : colors.muted }
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
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        { backgroundColor: pressed ? "#668A3B" : colors.primary }
      ]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
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
