import type { ResolvedTheme } from "@/context/AppPreferencesContext";

const light = {
  background: "#F7F9F8",
  surface: "#FFFFFF",
  text: "#17211F",
  muted: "#66736F",
  border: "#DDE4E1",
  primary: "#176B5B",
  primarySoft: "#D9EEE8",
  key: "#E9EFED",
  danger: "#B3261E"
};

const dark = {
  background: "#101513",
  surface: "#18201D",
  text: "#F1F6F4",
  muted: "#A9B6B1",
  border: "#2C3834",
  primary: "#77D5BD",
  primarySoft: "#214D42",
  key: "#26322E",
  danger: "#FFB4AB"
};

export function colorsFor(theme: ResolvedTheme) {
  return theme === "dark" ? dark : light;
}
