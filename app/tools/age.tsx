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
  const copy = toolCopy(language);
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
      return { rows: [], error: copy.age.dateFormatError };
    }

    const diff = calendarDifference(birthDate, endDate, calendar);
    if (!diff) return { rows: [], error: copy.age.futureBirthError };

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
          label: copy.age.exactAge,
          value: displayDigits(exact, numeralStyle),
          emphasis: true
        },
        {
          label: copy.age.totalDays,
          value: displayDigits(String(diff.totalDays), numeralStyle)
        },
        {
          label: copy.age.nextBirthday,
          value: daysUntil === 0
            ? copy.age.today
            : displayDigits(`${daysUntil} روز`, numeralStyle)
        }
      ],
      error: ""
    };
  }, [birth, calculationDate, calendar, numeralStyle, copy]);

  return (
    <ToolScreen
      title={t(language, "age")}
      subtitle={copy.age.subtitle}
      theme={resolvedTheme}
    >
      <ToolSection title={copy.age.calendarType} theme={resolvedTheme}>
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
          label={copy.age.birthDate}
          value={birth}
          onChangeText={setBirth}
          placeholder={calendar === "jalali" ? "1400/01/01" : "2000/01/01"}
          keyboardType="default"
          theme={resolvedTheme}
        />
        <ToolField
          label={copy.age.calculationDate}
          value={calculationDate}
          onChangeText={setCalculationDate}
          placeholder="سال/ماه/روز"
          keyboardType="default"
          theme={resolvedTheme}
        />
      </ToolSection>

      {result.error ? (
        <ToolMessage text={result.error} theme={resolvedTheme} danger />
      ) : result.rows.length ? (
        <ResultCard rows={result.rows} theme={resolvedTheme} />
      ) : (
        <ToolMessage text={copy.age.prompt} theme={resolvedTheme} />
      )}
    </ToolScreen>
  );
}
