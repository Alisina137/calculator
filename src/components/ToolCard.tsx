import { StyleSheet, Text, View } from "react-native";
import { AnimatedPressable } from "@/components/AnimatedPressable";
import { SymbolView } from "expo-symbols";
import { colorsFor } from "@/theme/colors";
import type { ResolvedTheme } from "@/context/AppPreferencesContext";

export function ToolCard({
  icon,
  title,
  subtitle,
  theme,
  onPress
}: {
  icon: {
    ios: string;
    android: string;
    web: string;
  };
  title: string;
  subtitle: string;
  theme: ResolvedTheme;
  onPress?: () => void;
}) {
  const colors = colorsFor(theme);

  return (
    <AnimatedPressable
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: pressed ? colors.primarySoft : colors.surface,
          borderColor: pressed ? colors.primary : colors.border,
          opacity: 1
        }
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.primarySoft }]}>
        <SymbolView
          name={icon}
          size={25}
          tintColor={colors.primary}
        />
      </View>
      <View style={styles.text}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text>
      </View>
      <Text style={[styles.chevron, { color: colors.muted }]}>‹</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 86,
    borderRadius: 23,
    padding: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 13,
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  text: { flex: 1 },
  title: { fontSize: 17, fontWeight: "800", textAlign: "right", writingDirection: "rtl" },
  subtitle: { marginTop: 4, fontSize: 14, lineHeight: 20, textAlign: "right", writingDirection: "rtl" },
  chevron: { fontSize: 30, fontWeight: "300" }
});
