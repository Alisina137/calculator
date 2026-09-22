import { useMemo, useState } from "react";
import {
  ChoiceRow,
  ResultCard,
  ToolField,
  ToolMessage,
  ToolScreen,
  ToolSection
} from "@/components/ToolScreen";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { t } from "@/i18n/translations";
import {
  formatToolNumber,
  parseToolNumber,
  percentageChange,
  percentageOf,
  percentOf
} from "@/tools/toolMath";
import { displayDigits } from "@/utils/numerals";

type Mode = "of" | "ratio" | "increase" | "decrease";

export default function PercentageToolScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const percentWord = language === "dari" ? "فیصدی" : "درصد";
  const [mode, setMode] = useState<Mode>("of");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const modes = [
    { id: "of" as const, label: `${percentWord} از عدد` },
    { id: "ratio" as const, label: `چند ${percentWord}؟` },
    { id: "increase" as const, label: `افزایش ${percentWord}ی` },
    { id: "decrease" as const, label: `کاهش ${percentWord}ی` }
  ];

  const result = useMemo(() => {
    if (!first.trim() || !second.trim()) return { rows: [], error: "" };

    const a = parseToolNumber(first);
    const b = parseToolNumber(second);
    if (a == null || b == null) {
      return { rows: [], error: "لطفاً عدد معتبر وارد کنید." };
    }

    if (mode === "of") {
      return {
        rows: [{
          label: "نتیجه",
          value: displayDigits(formatToolNumber(percentOf(a, b)), numeralStyle),
          emphasis: true
        }],
        error: ""
      };
    }

    if (mode === "ratio") {
      const value = percentageOf(a, b);
      if (value == null) return { rows: [], error: "مقدار کل نمی‌تواند صفر باشد." };
      return {
        rows: [{
          label: percentWord,
          value: displayDigits(`${formatToolNumber(value)}%`, numeralStyle),
          emphasis: true
        }],
        error: ""
      };
    }

    const change = percentageChange(a, b);
    if (!change) {
      return { rows: [], error: "مقدار اولیه نمی‌تواند صفر باشد." };
    }

    const amount = mode === "decrease" ? a - b : b - a;
    const percent = (amount / a) * 100;

    return {
      rows: [
        {
          label: mode === "decrease" ? "میزان کاهش" : "میزان افزایش",
          value: displayDigits(formatToolNumber(amount), numeralStyle)
        },
        {
          label: mode === "decrease" ? `${percentWord} کاهش` : `${percentWord} افزایش`,
          value: displayDigits(`${formatToolNumber(percent)}%`, numeralStyle),
          emphasis: true
        }
      ],
      error: ""
    };
  }, [first, second, mode, numeralStyle, percentWord]);

  const labels =
    mode === "of"
      ? [percentWord, "عدد پایه"]
      : mode === "ratio"
        ? ["بخش", "کل"]
        : ["مقدار اولیه", "مقدار جدید"];

  return (
    <ToolScreen
      title={t(language, "percentage")}
      subtitle="محاسبه‌های روزمره درصدی با نتیجه فوری"
      theme={resolvedTheme}
    >
      <ToolSection theme={resolvedTheme}>
        <ChoiceRow options={modes} value={mode} onChange={setMode} theme={resolvedTheme} />
        <ToolField
          label={labels[0]}
          value={first}
          onChangeText={setFirst}
          placeholder="0"
          theme={resolvedTheme}
        />
        <ToolField
          label={labels[1]}
          value={second}
          onChangeText={setSecond}
          placeholder="0"
          theme={resolvedTheme}
        />
      </ToolSection>

      {result.error ? (
        <ToolMessage text={result.error} theme={resolvedTheme} danger />
      ) : result.rows.length ? (
        <ResultCard rows={result.rows} theme={resolvedTheme} />
      ) : (
        <ToolMessage text="دو مقدار را وارد کنید تا نتیجه فوراً نمایش داده شود." theme={resolvedTheme} />
      )}
    </ToolScreen>
  );
}
