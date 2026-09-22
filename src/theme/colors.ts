import type { ResolvedTheme } from "@/context/AppPreferencesContext";

const light = {
  background: "#F1F6F9",
  surface: "#F7FAFC",
  text: "#2E6683",
  muted: "#9AB0BD",
  border: "#D9E3E9",
  primary: "#789C49",
  primarySoft: "#E7EFE1",
  key: "#E8F0F5",
  danger: "#D83B32"
};

const dark = {
  background: "#11191E",
  surface: "#18242A",
  text: "#D8EAF3",
  muted: "#8FA4AF",
  border: "#2B3A42",
  primary: "#9ABB69",
  primarySoft: "#293A29",
  key: "#202E35",
  danger: "#FF8A80"
};

export function colorsFor(theme: ResolvedTheme) {
  return theme === "dark" ? dark : light;
}
