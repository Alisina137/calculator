import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppPreferencesProvider, useAppPreferences } from "@/context/AppPreferencesContext";
import { CalculatorProvider } from "@/context/CalculatorContext";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";

function RootNavigator() {
  const { resolvedTheme } = useAppPreferences();

  return (
    <>
      <StatusBar style={resolvedTheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_left"
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppErrorBoundary>
      <AppPreferencesProvider>
        <CalculatorProvider>
          <RootNavigator />
        </CalculatorProvider>
      </AppPreferencesProvider>
    </AppErrorBoundary>
  );
}
