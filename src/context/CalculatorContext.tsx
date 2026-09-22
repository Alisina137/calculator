import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AngleUnit, HistoryEntry } from "@/calculation/types";

const HISTORY_KEY = "calculator.history.v1";
const DRAFT_KEY = "calculator.draft.v1";
const SCIENTIFIC_KEY = "calculator.scientific.v1";
const ANGLE_KEY = "calculator.angle.v1";
const HISTORY_LIMIT = 500;

type CalculatorContextValue = {
  expression: string;
  setExpression: (value: string) => void;
  history: HistoryEntry[];
  addHistory: (expression: string, result: string) => Promise<void>;
  deleteHistory: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;
  reuseResult: (entry: HistoryEntry) => void;
  reuseExpression: (entry: HistoryEntry) => void;
  scientificMode: boolean;
  setScientificMode: (value: boolean) => void;
  angleUnit: AngleUnit;
  setAngleUnit: (value: AngleUnit) => void;
  hydrated: boolean;
};

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<HistoryEntry>;
  return (
    typeof entry.id === "string" &&
    typeof entry.expression === "string" &&
    typeof entry.result === "string" &&
    typeof entry.createdAt === "number"
  );
}

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [scientificMode, setScientificMode] = useState(false);
  const [angleUnit, setAngleUnit] = useState<AngleUnit>("DEG");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    async function restore() {
      try {
        const [savedHistory, savedDraft, savedScientific, savedAngle] = await Promise.all([
          AsyncStorage.getItem(HISTORY_KEY),
          AsyncStorage.getItem(DRAFT_KEY),
          AsyncStorage.getItem(SCIENTIFIC_KEY),
          AsyncStorage.getItem(ANGLE_KEY)
        ]);

        if (!active) return;

        if (savedHistory) {
          const parsed = JSON.parse(savedHistory);
          if (Array.isArray(parsed)) {
            setHistory(parsed.filter(isHistoryEntry).slice(0, HISTORY_LIMIT));
          }
        }

        if (savedDraft !== null) setExpression(savedDraft);
        if (savedScientific !== null) setScientificMode(savedScientific === "true");
        if (savedAngle === "DEG" || savedAngle === "RAD") setAngleUnit(savedAngle);
      } catch {
        // Corrupted local state should never prevent app startup.
      } finally {
        if (active) setHydrated(true);
      }
    }

    restore();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(DRAFT_KEY, expression).catch(() => undefined);
  }, [expression, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(SCIENTIFIC_KEY, String(scientificMode)).catch(() => undefined);
  }, [scientificMode, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(ANGLE_KEY, angleUnit).catch(() => undefined);
  }, [angleUnit, hydrated]);

  const persistHistory = async (next: HistoryEntry[]) => {
    setHistory(next);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  };

  const addHistory = async (entryExpression: string, result: string) => {
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      expression: entryExpression,
      result,
      createdAt: Date.now()
    };

    const next = [entry, ...history].slice(0, HISTORY_LIMIT);
    await persistHistory(next);
  };

  const deleteHistory = async (id: string) => {
    await persistHistory(history.filter((entry) => entry.id !== id));
  };

  const clearHistory = async () => {
    await persistHistory([]);
  };

  const value = useMemo(
    () => ({
      expression,
      setExpression,
      history,
      addHistory,
      deleteHistory,
      clearHistory,
      reuseResult: (entry: HistoryEntry) => setExpression(entry.result),
      reuseExpression: (entry: HistoryEntry) => setExpression(entry.expression),
      scientificMode,
      setScientificMode,
      angleUnit,
      setAngleUnit,
      hydrated
    }),
    [expression, history, scientificMode, angleUnit, hydrated]
  );

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>;
}

export function useCalculator() {
  const value = useContext(CalculatorContext);
  if (!value) throw new Error("useCalculator must be used within CalculatorProvider");
  return value;
}
