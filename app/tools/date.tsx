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
    if (!first) return { rows: [], error: "تاریخ را به شکل سال/ماه/روز وارد کنید." };

    if (mode === "difference") {
      const second = parseCalendarDateText(dateB, calendar, normalizeDigits);
      if (!second) return { rows: [], error: "تاریخ دوم معتبر نیست." };

      const ordered =
        compareDates(first, second, calendar) <= 0
          ? [first, second] as const
          : [second, first] as const;
      const diff = calendarDifference(ordered[0], ordered[1], calendar);
      if (!diff) return { rows: [], error: "امکان محاسبه فاصله وجود ندارد." };

      return {
        rows: [
          {
            label: "فاصله دقیق",
            value: displayDigits(
              `${diff.years} سال، ${diff.months} ماه، ${diff.days} روز`,
              numeralStyle
            ),
            emphasis: true
          },
          {
            label: "مجموع روزها",
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
      return { rows: [], error: "مدت زمان باید یک عدد صحیح و نامنفی باشد." };
    }

    const signed = operation === "subtract" ? -parsedAmount : parsedAmount;
    const calculated = addCalendarDuration(first, signed, unit, calendar);

    return {
      rows: [{
        label: "تاریخ نتیجه",
        value: displayDigits(formatCalendarDate(calculated), numeralStyle),
        emphasis: true
      }],
      error: ""
    };
  }, [dateA, dateB, amount, mode, unit, operation, calendar, numeralStyle]);

  return (
    <ToolScreen
      title={t(language, "date")}
      subtitle="فاصله تاریخ‌ها یا افزودن و کم‌کردن زمان"
      theme={resolvedTheme}
    >
      <ToolSection theme={resolvedTheme}>
        <ChoiceRow
          options={[
            { id: "difference", label: "فاصله بین دو تاریخ" },
            { id: "arithmetic", label: "افزودن / کم‌کردن" }
          ]}
          value={mode}
          onChange={setMode}
          theme={resolvedTheme}
        />
        <ChoiceRow
          options={[
            { id: "jalali", label: "هجری شمسی" },
            { id: "gregorian", label: "میلادی" }
          ]}
          value={calendar}
          onChange={switchCalendar}
          theme={resolvedTheme}
        />
      </ToolSection>

      <ToolSection theme={resolvedTheme}>
        <ToolField
          label={mode === "difference" ? "تاریخ اول" : "تاریخ شروع"}
          value={dateA}
          onChangeText={setDateA}
          placeholder="سال/ماه/روز"
          keyboardType="default"
          theme={resolvedTheme}
        />

        {mode === "difference" ? (
          <ToolField
            label="تاریخ دوم"
            value={dateB}
            onChangeText={setDateB}
            placeholder="سال/ماه/روز"
            keyboardType="default"
            theme={resolvedTheme}
          />
        ) : (
          <>
            <ToolField
              label="مقدار"
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              keyboardType="default"
              theme={resolvedTheme}
            />
            <ChoiceRow
              options={[
                { id: "days", label: "روز" },
                { id: "weeks", label: "هفته" },
                { id: "months", label: "ماه" },
                { id: "years", label: "سال" }
              ]}
              value={unit}
              onChange={setUnit}
              theme={resolvedTheme}
            />
            <ChoiceRow
              options={[
                { id: "add", label: "افزودن" },
                { id: "subtract", label: "کم‌کردن" }
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
        <ToolMessage text="مقدارهای لازم را وارد کنید تا نتیجه نمایش داده شود." theme={resolvedTheme} />
      )}
    </ToolScreen>
  );
}
