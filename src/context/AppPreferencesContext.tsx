import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export type AppLanguage = "dari" | "persian";
export type NumeralStyle = "persian" | "latin";
export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";
export type ToolGuidanceId = "percentage" | "discount" | "unit" | "age" | "date";

const STORAGE_KEY = "calculator.preferences.v1";

type PersistedPreferences = {
  language: AppLanguage;
  numeralStyle: NumeralStyle;
  themePreference: ThemePreference;
  hapticsEnabled: boolean;
  toolGuidance: Record<ToolGuidanceId, boolean>;
};

type PreferencesContextValue = PersistedPreferences & {
  setLanguage: (value: AppLanguage) => void;
  setNumeralStyle: (value: NumeralStyle) => void;
  setThemePreference: (value: ThemePreference) => void;
  resolvedTheme: ResolvedTheme;
  setHapticsEnabled: (value: boolean) => void;
  setToolGuidanceEnabled: (tool: ToolGuidanceId, value: boolean) => void;
};

const AppPreferencesContext = createContext<PreferencesContextValue | null>(null);

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [language, setLanguage] = useState<AppLanguage>("dari");
  const [numeralStyle, setNumeralStyle] = useState<NumeralStyle>("persian");
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [toolGuidance, setToolGuidance] = useState<Record<ToolGuidanceId, boolean>>({
    percentage: false,
    discount: false,
    unit: false,
    age: false,
    date: false
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (!active || !saved) return;
        const parsed = JSON.parse(saved) as Partial<PersistedPreferences>;

        if (parsed.language === "dari" || parsed.language === "persian") {
          setLanguage(parsed.language);
        }
        if (parsed.numeralStyle === "persian" || parsed.numeralStyle === "latin") {
          setNumeralStyle(parsed.numeralStyle);
        }
        if (
          parsed.themePreference === "system" ||
          parsed.themePreference === "light" ||
          parsed.themePreference === "dark"
        ) {
          setThemePreference(parsed.themePreference);
        }
        if (typeof parsed.hapticsEnabled === "boolean") {
          setHapticsEnabled(parsed.hapticsEnabled);
        }
        if (parsed.toolGuidance && typeof parsed.toolGuidance === "object") {
          setToolGuidance((current) => ({
            ...current,
            ...parsed.toolGuidance
          }));
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setHydrated(true);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const payload: PersistedPreferences = {
      language,
      numeralStyle,
      themePreference,
      hapticsEnabled,
      toolGuidance
    };

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload)).catch(() => undefined);
  }, [language, numeralStyle, themePreference, hapticsEnabled, toolGuidance, hydrated]);

  const resolvedTheme: ResolvedTheme =
    themePreference === "system"
      ? systemScheme === "dark"
        ? "dark"
        : "light"
      : themePreference;

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
      setHapticsEnabled,
      toolGuidance,
      setToolGuidanceEnabled: (tool: ToolGuidanceId, enabled: boolean) =>
        setToolGuidance((current) => ({ ...current, [tool]: enabled }))
    }),
    [language, numeralStyle, themePreference, resolvedTheme, hapticsEnabled, toolGuidance]
  );

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

export function useAppPreferences() {
  const value = useContext(AppPreferencesContext);
  if (!value) throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  return value;
}
