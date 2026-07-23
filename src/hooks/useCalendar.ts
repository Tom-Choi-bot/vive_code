import { useMemo, useState } from "react";
import { useApp } from "../contexts/AppContext";
import { getMonthSummaries } from "../utils/calendar";
import { getChecklistForDate } from "../utils/checklist";

export function useCalendar(initialDate: Date = new Date()) {
  const { routines, records, selectedPetId } = useApp();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [viewMonth, setViewMonth] = useState(() => ({
    year: initialDate.getFullYear(),
    month: initialDate.getMonth(),
  }));

  const monthSummaries = useMemo(
    () =>
      getMonthSummaries(
        routines,
        records,
        selectedPetId,
        viewMonth.year,
        viewMonth.month,
      ),
    [routines, records, selectedPetId, viewMonth.year, viewMonth.month],
  );

  const dayItems = useMemo(
    () => getChecklistForDate(routines, records, selectedPetId, selectedDate),
    [routines, records, selectedPetId, selectedDate],
  );

  const goToPrevMonth = () => {
    setViewMonth((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { ...prev, month: prev.month - 1 };
    });
  };

  const goToNextMonth = () => {
    setViewMonth((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { ...prev, month: prev.month + 1 };
    });
  };

  return {
    selectedDate,
    setSelectedDate,
    viewMonth,
    monthSummaries,
    dayItems,
    goToPrevMonth,
    goToNextMonth,
  };
}

// TODO: 주간 뷰 전환
