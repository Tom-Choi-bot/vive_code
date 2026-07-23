import { useMemo } from "react";
import { useApp } from "../contexts/AppContext";
import { getChecklistForDate, calcCompletionRate } from "../utils/checklist";

export function useTodayChecklist(date: Date = new Date()) {
  const { routines, records, selectedPetId } = useApp();

  const items = useMemo(
    () => getChecklistForDate(routines, records, selectedPetId, date),
    [routines, records, selectedPetId, date],
  );

  const completionRate = useMemo(() => calcCompletionRate(items), [items]);

  return { items, completionRate };
}
