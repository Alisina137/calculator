import { normalizeDigits } from "@/utils/numerals";

export function parseToolNumber(value: string): number | null {
  const normalized = normalizeDigits(value)
    .replace(/[٬،,\s]/g, "")
    .replace(/٫/g, ".")
    .trim();

  if (!normalized || !/^-?(?:\d+\.?\d*|\.\d+)$/.test(normalized)) {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatToolNumber(value: number, maximumFractionDigits = 8): string {
  if (!Number.isFinite(value)) return "";
  const cleaned = Math.abs(value) < 1e-12 ? 0 : value;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    useGrouping: true
  }).format(cleaned);
}

export function percentOf(percent: number, base: number): number {
  return (percent / 100) * base;
}

export function percentageOf(part: number, total: number): number | null {
  return total === 0 ? null : (part / total) * 100;
}

export function percentageChange(original: number, next: number): {
  amount: number;
  percent: number;
} | null {
  if (original === 0) return null;
  const amount = next - original;
  return { amount, percent: (amount / original) * 100 };
}
