import { useMemo, useState } from "react";
import {
  Modal,
   ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import type { AppLanguage, ResolvedTheme } from "@/context/AppPreferencesContext";
import type { NumeralStyle } from "@/i18n/numeralStyles";
import { colorsFor } from "@/theme/colors";
import { AnimatedPressable } from "@/components/AnimatedPressable";
import {
  daysInMonth,
  formatCalendarDate,
  parseCalendarDateText,
  todayInCalendar,
  type CalendarDate,
  type CalendarType
} from "@/tools/dateUtils";
import { displayDigits, normalizeDigits } from "@/utils/numerals";
import { rowDirection, textAlignment, textDirection } from "@/i18n/languages";

type PickerStep = "year" | "month" | "day";

export function CalendarDatePicker({
  label,
  value,
  calendar,
  language,
  numeralStyle,
  theme,
  onSelect
}: {
  label: string;
  value: string;
  calendar: CalendarType;
  language: AppLanguage;
  numeralStyle: NumeralStyle;
  theme: ResolvedTheme;
  onSelect: (value: string) => void;
}) {
  const colors = colorsFor(theme);
  const row = rowDirection(language);
  const align = textAlignment(language);
  const direction = textDirection(language);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<PickerStep>("year");
  const today = todayInCalendar(calendar);

  const parsed =
    parseCalendarDateText(value, calendar, normalizeDigits) ?? today;

  const [draft, setDraft] = useState<CalendarDate>(parsed);

  const copy =
    language === "fa"
      ? { choose: "انتخاب از تقویم", year: "سال", month: "ماه", day: "روز", cancel: "لغو", title: "انتخاب تاریخ" }
      : { choose: "Choose from calendar", year: "Year", month: "Month", day: "Day", cancel: "Cancel", title: "Choose date" };

  const years = useMemo(() => {
    const currentYear = today.year;
    const start = Math.max(1, currentYear - 120);
    const end = currentYear + 20;
    return Array.from({ length: end - start + 1 }, (_, index) => end - index);
  }, [today.year]);

  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const days = Array.from(
    { length: daysInMonth(calendar, draft.year, draft.month) },
    (_, index) => index + 1
  );

  const open = () => {
    const initial =
      parseCalendarDateText(value, calendar, normalizeDigits) ??
      todayInCalendar(calendar);
    setDraft(initial);
    setStep("year");
    setVisible(true);
  };

  const chooseYear = (year: number) => {
    const maxDay = daysInMonth(calendar, year, draft.month);
    setDraft((current) => ({
      ...current,
      year,
      day: Math.min(current.day, maxDay)
    }));
    setStep("month");
  };

  const chooseMonth = (month: number) => {
    const maxDay = daysInMonth(calendar, draft.year, month);
    setDraft((current) => ({
      ...current,
      month,
      day: Math.min(current.day, maxDay)
    }));
    setStep("day");
  };

  const chooseDay = (day: number) => {
    const selected = { ...draft, day };
    setDraft(selected);
    onSelect(formatCalendarDate(selected));
    setVisible(false);
  };

  const stepLabel =
    step === "year" ? copy.year : step === "month" ? copy.month : copy.day;

  return (
    <>
      <AnimatedPressable
        accessibilityRole="button"
        accessibilityLabel={`${copy.choose}، ${label}`}
        onPress={open}
        style={({ pressed }) => [
          styles.trigger,
          { flexDirection: row },
          {
            backgroundColor: pressed ? colors.primarySoft : colors.surface,
            borderColor: pressed ? colors.primary : colors.border
          }
        ]}
      >
        <Text style={[styles.triggerText, { color: colors.primary, writingDirection: direction }]}>
          {copy.choose}
        </Text>
        <Text style={[styles.calendarIcon, { color: colors.primary }]}>▣</Text>
      </AnimatedPressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: colors.background,
                borderColor: colors.border
              }
            ]}
          >
            <View style={[styles.modalHeader, { flexDirection: row }]}>
              <Text style={[styles.modalTitle, { color: colors.text, textAlign: align, writingDirection: direction }]}>
                {copy.title}
              </Text>
              <AnimatedPressable
                accessibilityRole="button"
                onPress={() => setVisible(false)}
                style={styles.closeButton}
              >
                <Text style={[styles.closeText, { color: colors.muted }]}>×</Text>
              </AnimatedPressable>
            </View>

            <View style={[styles.summaryRow, { flexDirection: row }]}>
              {(["year", "month", "day"] as PickerStep[]).map((item) => {
                const active = step === item;
                const valueText =
                  item === "year"
                    ? draft.year
                    : item === "month"
                      ? draft.month
                      : draft.day;
                const labelText =
                  item === "year"
                    ? copy.year
                    : item === "month"
                      ? copy.month
                      : copy.day;

                return (
                  <AnimatedPressable
                    key={item}
                    accessibilityRole="button"
                    onPress={() => setStep(item)}
                    style={[
                      styles.summaryItem,
                      {
                        backgroundColor: active ? colors.primarySoft : colors.surface,
                        borderColor: active ? colors.primary : colors.border
                      }
                    ]}
                  >
                    <Text
                      style={[
                        styles.summaryLabel,
                        { color: active ? colors.primary : colors.muted }
                      ]}
                    >
                      {labelText}
                    </Text>
                    <Text
                      style={[
                        styles.summaryValue,
                        { color: active ? colors.primary : colors.text }
                      ]}
                    >
                      {displayDigits(String(valueText), numeralStyle)}
                    </Text>
                  </AnimatedPressable>
                );
              })}
            </View>

            <Text style={[styles.stepTitle, { color: colors.text, textAlign: align, writingDirection: direction }]}>
              {stepLabel}
            </Text>

            <ScrollView
              style={styles.optionsScroll}
              contentContainerStyle={[styles.optionsGrid, { flexDirection: row }]}
              showsVerticalScrollIndicator={false}
            >
              {(step === "year" ? years : step === "month" ? months : days).map(
                (option) => {
                  const selected =
                    step === "year"
                      ? option === draft.year
                      : step === "month"
                        ? option === draft.month
                        : option === draft.day;

                  return (
                    <AnimatedPressable
                      key={option}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      onPress={() => {
                        if (step === "year") chooseYear(option);
                        else if (step === "month") chooseMonth(option);
                        else chooseDay(option);
                      }}
                      style={({ pressed }) => [
                        styles.option,
                        {
                          backgroundColor: selected
                            ? colors.primary
                            : pressed
                              ? colors.primarySoft
                              : colors.surface,
                          borderColor: selected ? colors.primary : colors.border
                        }
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          { color: selected ? "#FFFFFF" : colors.text }
                        ]}
                      >
                        {displayDigits(
                          step === "year"
                            ? String(option)
                            : String(option).padStart(2, "0"),
                          numeralStyle
                        )}
                      </Text>
                    </AnimatedPressable>
                  );
                }
              )}
            </ScrollView>

            <AnimatedPressable
              accessibilityRole="button"
              onPress={() => setVisible(false)}
              style={[
                styles.cancelButton,
                { backgroundColor: colors.surface, borderColor: colors.border }
              ]}
            >
              <Text style={[styles.cancelText, { color: colors.text, writingDirection: direction }]}>
                {copy.cancel}
              </Text>
            </AnimatedPressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  triggerText: {
    fontSize: 14,
    fontWeight: "800",
    writingDirection: "rtl"
  },
  calendarIcon: {
    fontSize: 18
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.42)",
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    maxHeight: "84%",
    borderWidth: 1,
    borderRadius: 24,
    padding: 18
  },
  modalHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    writingDirection: "rtl"
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  closeText: {
    fontSize: 30,
    lineHeight: 32
  },
  summaryRow: {
    flexDirection: "row-reverse",
    gap: 8,
    marginTop: 12
  },
  summaryItem: {
    flex: 1,
    minHeight: 62,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6
  },
  summaryLabel: {
    fontSize: 12,
    writingDirection: "rtl"
  },
  summaryValue: {
    marginTop: 3,
    fontSize: 17,
    fontWeight: "800"
  },
  stepTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "right",
    writingDirection: "rtl"
  },
  optionsScroll: {
    maxHeight: 300
  },
  optionsGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: 4
  },
  option: {
    width: "22.5%",
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  optionText: {
    fontSize: 15,
    fontWeight: "700"
  },
  cancelButton: {
    minHeight: 46,
    marginTop: 14,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "800",
    writingDirection: "rtl"
  }
});
