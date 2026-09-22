import { useMemo, useState } from "react";
import { CalendarDatePicker } from "@/components/CalendarDatePicker";
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
  calendarDifference,
  daysInMonth,
  formatCalendarDate,
  parseCalendarDateText,
  todayInCalendar,
  toDayNumber,
  type CalendarType
} from "@/tools/dateUtils";
import { displayDigits, normalizeDigits } from "@/utils/numerals";

function formatDateInput(nextValue: string, previousValue: string): string {
  const normalized = normalizeDigits(nextValue);
  const digits = normalized.replace(/\D/g, "").slice(0, 8);
  const deleting = normalized.length < previousValue.length;

  if (!digits) return "";

  if (digits.length <= 4) {
    if (digits.length === 4 && !deleting) return `${digits}/`;
    return digits;
  }

  if (digits.length <= 6) {
    const year = digits.slice(0, 4);
    const month = digits.slice(4);

    if (digits.length === 6 && !deleting) {
      return `${year}/${month}/`;
    }

    return `${year}/${month}`;
  }

  return `${digits.slice(0, 4)}/${digits.slice(4, 6)}/${digits.slice(6, 8)}`;
}

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
      guide={toolGuidance(language, "age")}
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
          onChangeText={(value) => setBirth(formatDateInput(value, birth))}
          placeholder={calendar === "jalali" ? "1400/01/01" : "2000/01/01"}
          keyboardType="number-pad"
          theme={resolvedTheme}
        />
        <CalendarDatePicker
          label={copy.age.birthDate}
          value={birth}
          calendar={calendar}
          language={language}
          numeralStyle={numeralStyle}
          theme={resolvedTheme}
          onSelect={setBirth}
        />
        <ToolField
          label={copy.age.calculationDate}
          value={calculationDate}
          onChangeText={(value) =>
            setCalculationDate(formatDateInput(value, calculationDate))
          }
          placeholder="سال/ماه/روز"
          keyboardType="number-pad"
          theme={resolvedTheme}
        />
        <CalendarDatePicker
          label={copy.age.calculationDate}
          value={calculationDate}
          calendar={calendar}
          language={language}
          numeralStyle={numeralStyle}
          theme={resolvedTheme}
          onSelect={setCalculationDate}
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
