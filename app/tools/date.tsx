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
import {
  addCalendarDuration,
  calendarDifference,
  compareDates,
  formatCalendarDate,
  parseCalendarDateText,
  todayInCalendar,
  type CalendarType
} from "@/tools/dateUtils";
import { parseToolNumber } from "@/tools/toolMath";
import { displayDigits, normalizeDigits } from "@/utils/numerals";

type Mode = "difference" | "arithmetic";
type DurationUnit = "days" | "weeks" | "months" | "years";
type Operation = "add" | "subtract";

export default function DateToolScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const copy = toolCopy(language);
  const [calendar, setCalendar] = useState<CalendarType>("jalali");
  const initial = formatCalendarDate(todayInCalendar("jalali"));
  const [mode, setMode] = useState<Mode>("difference");
  const [dateA, setDateA] = useState(initial);
  const [dateB, setDateB] = useState(initial);
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<DurationUnit>("days");
  const [operation, setOperation] = useState<Operation>("add");

  const switchCalendar = (next: CalendarType) => {
    const today = formatCalendarDate(todayInCalendar(next));
    setCalendar(next);
    setDateA(today);
    setDateB(today);
  };

  const result = useMemo(() => {
    const first = parseCalendarDateText(dateA, calendar, normalizeDigits);
    if (!first) return { rows: [], error: copy.date.dateFormatError };

    if (mode === "difference") {
      const second = parseCalendarDateText(dateB, calendar, normalizeDigits);
      if (!second) return { rows: [], error: copy.date.secondDateError };

      const ordered =
        compareDates(first, second, calendar) <= 0
          ? [first, second] as const
          : [second, first] as const;
      const diff = calendarDifference(ordered[0], ordered[1], calendar);
      if (!diff) return { rows: [], error: copy.date.differenceError };

      return {
        rows: [
          {
            label: copy.date.exactDifference,
            value: displayDigits(
              `${diff.years} سال، ${diff.months} ماه، ${diff.days} روز`,
              numeralStyle
            ),
            emphasis: true
          },
          {
            label: copy.date.totalDays,
            value: displayDigits(String(diff.totalDays), numeralStyle)
          }
        ],
        error: ""
      };
    }

    if (!amount.trim()) return { rows: [], error: "" };
    const parsedAmount = parseToolNumber(amount);
    if (
      parsedAmount == null ||
      parsedAmount < 0 ||
      !Number.isInteger(parsedAmount)
    ) {
      return { rows: [], error: copy.date.durationError };
    }

    const signed = operation === "subtract" ? -parsedAmount : parsedAmount;
    const calculated = addCalendarDuration(first, signed, unit, calendar);

    return {
      rows: [{
        label: copy.date.resultDate,
        value: displayDigits(formatCalendarDate(calculated), numeralStyle),
        emphasis: true
      }],
      error: ""
    };
  }, [dateA, dateB, amount, mode, unit, operation, calendar, numeralStyle, copy]);

  return (
    <ToolScreen
      title={t(language, "date")}
      subtitle={copy.date.subtitle}
      theme={resolvedTheme}
    >
      <ToolSection theme={resolvedTheme}>
        <ChoiceRow
          options={[
            { id: "difference", label: copy.date.differenceMode },
            { id: "arithmetic", label: copy.date.arithmeticMode }
          ]}
          value={mode}
          onChange={setMode}
          theme={resolvedTheme}
        />
        <ChoiceRow
          options={[
            { id: "jalali", label: copy.age.jalali },
            { id: "gregorian", label: copy.age.gregorian }
          ]}
          value={calendar}
          onChange={switchCalendar}
          theme={resolvedTheme}
        />
      </ToolSection>

      <ToolSection theme={resolvedTheme}>
        <ToolField
          label={mode === "difference" ? copy.date.firstDate : copy.date.startDate}
          value={dateA}
          onChangeText={setDateA}
          placeholder="سال/ماه/روز"
          keyboardType="default"
          theme={resolvedTheme}
        />

        {mode === "difference" ? (
          <ToolField
            label={copy.date.secondDate}
            value={dateB}
            onChangeText={setDateB}
            placeholder="سال/ماه/روز"
            keyboardType="default"
            theme={resolvedTheme}
          />
        ) : (
          <>
            <ToolField
              label={copy.date.amount}
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              keyboardType="default"
              theme={resolvedTheme}
            />
            <ChoiceRow
              options={[
                { id: "days", label: copy.date.days },
                { id: "weeks", label: copy.date.weeks },
                { id: "months", label: copy.date.months },
                { id: "years", label: copy.date.years }
              ]}
              value={unit}
              onChange={setUnit}
              theme={resolvedTheme}
            />
            <ChoiceRow
              options={[
                { id: "add", label: copy.date.add },
                { id: "subtract", label: copy.date.subtract }
              ]}
              value={operation}
              onChange={setOperation}
              theme={resolvedTheme}
            />
          </>
        )}
      </ToolSection>

      {result.error ? (
        <ToolMessage text={result.error} theme={resolvedTheme} danger />
      ) : result.rows.length ? (
        <ResultCard rows={result.rows} theme={resolvedTheme} />
      ) : (
        <ToolMessage text={copy.date.prompt} theme={resolvedTheme} />
      )}
    </ToolScreen>
  );
}
