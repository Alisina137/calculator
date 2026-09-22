import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import type { ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { useCalculator } from "@/context/CalculatorContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";

function NavSymbol({
  focused,
  color,
  ios,
  android
}: {
  focused: boolean;
  color: ColorValue;
  ios: string;
  android: string;
}) {
  return (
    <SymbolView
      name={{ ios, android, web: android }}
      size={focused ? 25 : 23}
      tintColor={color}
    />
  );
}

export default function TabsLayout() {
  const { language, resolvedTheme } = useAppPreferences();
  const { scientificMode } = useCalculator();
  const insets = useSafeAreaInsets();
  const colors = colorsFor(resolvedTheme);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: scientificMode
          ? { display: "none" }
          : {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              height: 62 + Math.max(insets.bottom, 10),
              paddingBottom: Math.max(insets.bottom, 10),
              paddingTop: 8,
              paddingLeft: Math.max(insets.left, 8),
              paddingRight: Math.max(insets.right, 8)
            },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          writingDirection: "rtl"
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t(language, "calculator"),
          tabBarIcon: ({ focused, color }) => (
            <NavSymbol
              focused={focused}
              color={color}
              ios="plus.forwardslash.minus"
              android="calculate"
            />
          )
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: t(language, "tools"),
          tabBarIcon: ({ focused, color }) => (
            <NavSymbol
              focused={focused}
              color={color}
              ios="wrench.and.screwdriver"
              android="construction"
            />
          )
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t(language, "history"),
          tabBarIcon: ({ focused, color }) => (
            <NavSymbol
              focused={focused}
              color={color}
              ios="clock.arrow.circlepath"
              android="history"
            />
          )
        }}
      />
    </Tabs>
  );
}
