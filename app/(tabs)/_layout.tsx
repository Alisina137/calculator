import { Tabs } from "expo-router";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";
import { Text } from "react-native";

function TabIcon({ symbol, focused }: { symbol: string; focused: boolean }) {
  return <Text style={{ fontSize: focused ? 23 : 21 }}>{symbol}</Text>;
}

export default function TabsLayout() {
  const { language, resolvedTheme } = useAppPreferences();
  const colors = colorsFor(resolvedTheme);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 72,
          paddingBottom: 10,
          paddingTop: 8
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
          tabBarIcon: ({ focused }) => <TabIcon symbol="🧮" focused={focused} />
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: t(language, "tools"),
          tabBarIcon: ({ focused }) => <TabIcon symbol="▦" focused={focused} />
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t(language, "history"),
          tabBarIcon: ({ focused }) => <TabIcon symbol="↺" focused={focused} />
        }}
      />
    </Tabs>
  );
}
