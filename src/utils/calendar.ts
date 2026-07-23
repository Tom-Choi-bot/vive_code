import type { DailyRecord, Routine } from "../types";
import { formatDate } from "./date";
import { getChecklistForDate } from "./checklist";

export interface DaySummary {
  date: string;
  totalSlots: number;
  completedSlots: number;
  rate: number;
}

export function getDaySummary(
  routines: Routine[],
  records: DailyRecord[],
  petId: string | null,
  date: Date,
): DaySummary {
  const items = getChecklistForDate(routines, records, petId, date);
  const totalSlots = items.reduce((sum, item) => sum + item.routine.timesPerDay, 0);
  const completedSlots = items.reduce((sum, item) => sum + item.completedCount, 0);

  return {
    date: formatDate(date),
    totalSlots,
    completedSlots,
    rate: totalSlots === 0 ? 0 : Math.round((completedSlots / totalSlots) * 100),
  };
}

export function getMonthSummaries(
  routines: Routine[],
  records: DailyRecord[],
  petId: string | null,
  year: number,
  month: number,
): Map<string, DaySummary> {
  const map = new Map<string, DaySummary>();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const summary = getDaySummary(routines, records, petId, date);
    if (summary.totalSlots > 0) {
      map.set(summary.date, summary);
    }
  }

  return map;
}

// TODO: 주간 뷰, 연속 완료 스트릭 표시
