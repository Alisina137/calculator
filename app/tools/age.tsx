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
  calendarDifference,
  daysInMonth,
  formatCalendarDate,
  parseCalendarDateText,
  todayInCalendar,
  toDayNumber,
  type CalendarType
} from "@/tools/dateUtils";
import { displayDigits, normalizeDigits } from "@/utils/numerals";

export default function AgeToolScreen() {
  const { language, numeralStyle, resolvedTheme } = useAppPreferences();
  const [calendar, setCalendar] = useState<CalendarType>("jalali");
  const [birth, setBirth] = useState("");
  const [calculationDate, setCalculationDate] = useState(
    formatCalendarDate(todayInCalendar("jalali"))
  );

  const switchCalendar = (next: CalendarType) => {
    setCalendar(next);
    setBirth("");
    setCalculationDate(formatCalendarDate(todayInCalendar(next)));
  };

  const result = useMemo(() => {
    if (!birth.trim() || !calculationDate.trim()) return { rows: [], error: "" };

    const birthDate = parseCalendarDateText(birth, calendar, normalizeDigits);
    const endDate = parseCalendarDateText(calculationDate, calendar, normalizeDigits);

    if (!birthDate || !endDate) {
      return { rows: [], error: "تاریخ را به شکل سال/ماه/روز وارد کنید." };
    }

    const diff = calendarDifference(birthDate, endDate, calendar);
    if (!diff) return { rows: [], error: "تاریخ تولد باید قبل از تاریخ محاسبه باشد." };

    let birthdayYear = endDate.year;
    const thisBirthday = {
      year: birthdayYear,
      month: birthDate.month,
      day: Math.min(birthDate.day, daysInMonth(calendar, birthdayYear, birthDate.month))
    };

    if (toDayNumber(thisBirthday, calendar) < toDayNumber(endDate, calendar)) {
      birthdayYear += 1;
    }

    const nextBirthday = {
      year: birthdayYear,
      month: birthDate.month,
      day: Math.min(birthDate.day, daysInMonth(calendar, birthdayYear, birthDate.month))
    };
    const daysUntil = toDayNumber(nextBirthday, calendar) - toDayNumber(endDate, calendar);

    const exact = `${diff.years} سال، ${diff.months} ماه، ${diff.days} روز`;

    return {
      rows: [
        {
          label: "سن دقیق",
          value: displayDigits(exact, numeralStyle),
          emphasis: true
        },
        {
          label: "مجموع روزهای عمر",
          value: displayDigits(String(diff.totalDays), numeralStyle)
        },
        {
          label: "تا تولد بعدی",
          value: daysUntil === 0
            ? "امروز"
            : displayDigits(`${daysUntil} روز`, numeralStyle)
        }
      ],
      error: ""
    };
  }, [birth, calculationDate, calendar, numeralStyle]);

  return (
    <ToolScreen
      title={t(language, "age")}
      subtitle="سن دقیق با تاریخ هجری شمسی یا میلادی"
      theme={resolvedTheme}
    >
      <ToolSection title="نوع تقویم" theme={resolvedTheme}>
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
          label="تاریخ تولد"
          value={birth}
          onChangeText={setBirth}
          placeholder={calendar === "jalali" ? "1400/01/01" : "2000/01/01"}
          keyboardType="number-pad"
          theme={resolvedTheme}
        />
        <ToolField
          label="تاریخ محاسبه"
          value={calculationDate}
          onChangeText={setCalculationDate}
          placeholder="سال/ماه/روز"
          keyboardType="number-pad"
          theme={resolvedTheme}
        />
      </ToolSection>

      {result.error ? (
        <ToolMessage text={result.error} theme={resolvedTheme} danger />
      ) : result.rows.length ? (
        <ResultCard rows={result.rows} theme={resolvedTheme} />
      ) : (
        <ToolMessage text="تاریخ تولد را وارد کنید تا سن دقیق نمایش داده شود." theme={resolvedTheme} />
      )}
    </ToolScreen>
  );
}
