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
import { toolCopy } from "@/i18n/toolCopy";
import { toolGuidance } from "@/i18n/toolGuidance";
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
  const copy = toolCopy(language);
  const percentWord = copy.percent;
  const [mode, setMode] = useState<Mode>("of");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const modes = [
    { id: "of" as const, label: copy.percentage.of },
    { id: "ratio" as const, label: copy.percentage.ratio },
    { id: "increase" as const, label: copy.percentage.increase },
    { id: "decrease" as const, label: copy.percentage.decrease }
  ];

  const result = useMemo(() => {
    if (!first.trim() || !second.trim()) return { rows: [], error: "" };

    const a = parseToolNumber(first);
    const b = parseToolNumber(second);
    if (a == null || b == null) {
      return { rows: [], error: copy.invalidNumber };
    }

    if (mode === "of") {
      return {
        rows: [{
          label: copy.result,
          value: displayDigits(formatToolNumber(percentOf(a, b)), numeralStyle),
          emphasis: true
        }],
        error: ""
      };
    }

    if (mode === "ratio") {
      const value = percentageOf(a, b);
      if (value == null) return { rows: [], error: copy.percentage.totalZero };
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
      return { rows: [], error: copy.percentage.initialZero };
    }

    const amount = mode === "decrease" ? a - b : b - a;
    const percent = (amount / a) * 100;

    return {
      rows: [
        {
          label: mode === "decrease" ? copy.percentage.decreaseAmount : copy.percentage.increaseAmount,
          value: displayDigits(formatToolNumber(amount), numeralStyle)
        },
        {
          label: mode === "decrease" ? copy.percentage.decreasePercent : copy.percentage.increasePercent,
          value: displayDigits(`${formatToolNumber(percent)}%`, numeralStyle),
          emphasis: true
        }
      ],
      error: ""
    };
  }, [first, second, mode, numeralStyle, percentWord, copy]);

  const labels =
    mode === "of"
      ? [percentWord, copy.percentage.base]
      : mode === "ratio"
        ? [copy.percentage.part, copy.percentage.total]
        : [copy.percentage.initial, copy.percentage.next];

  return (
    <ToolScreen
      title={t(language, "percentage")}
      subtitle={copy.percentage.subtitle}
      theme={resolvedTheme}
      guide={toolGuidance(language, "percentage")}
      guideId="percentage"
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
        <ToolMessage text={copy.percentage.prompt} theme={resolvedTheme} />
      )}
    </ToolScreen>
  );
}
