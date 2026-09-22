import { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export type AppLanguage = "dari" | "persian";
export type NumeralStyle = "persian" | "latin";
export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

type PreferencesContextValue = {
  language: AppLanguage;
  setLanguage: (value: AppLanguage) => void;
  numeralStyle: NumeralStyle;
  setNumeralStyle: (value: NumeralStyle) => void;
  themePreference: ThemePreference;
  setThemePreference: (value: ThemePreference) => void;
  resolvedTheme: ResolvedTheme;
  hapticsEnabled: boolean;
  setHapticsEnabled: (value: boolean) => void;
};

const AppPreferencesContext = createContext<PreferencesContextValue | null>(null);

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [language, setLanguage] = useState<AppLanguage>("dari");
  const [numeralStyle, setNumeralStyle] = useState<NumeralStyle>("persian");
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

  const resolvedTheme: ResolvedTheme =
    themePreference === "system" ? (systemScheme === "dark" ? "dark" : "light") : themePreference;

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      numeralStyle,
      setNumeralStyle,
      themePreference,
      setThemePreference,
      resolvedTheme,
      hapticsEnabled,
      setHapticsEnabled
    }),
    [language, numeralStyle, themePreference, resolvedTheme, hapticsEnabled]
  );

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

export function useAppPreferences() {
  const value = useContext(AppPreferencesContext);
  if (!value) throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  return value;
}
