import type { DailyRecord, Routine } from "../types";
import { formatDate } from "./date";

export interface ChecklistItem {
  routine: Routine;
  record: DailyRecord | null;
  completedCount: number;
  remaining: number;
}

export function findRecord(
  records: DailyRecord[],
  routineId: string,
  dateStr: string,
): DailyRecord | null {
  return records.find((r) => r.routineId === routineId && r.date === dateStr) ?? null;
}

export function getChecklistForDate(
  routines: Routine[],
  records: DailyRecord[],
  petId: string | null,
  date: Date,
): ChecklistItem[] {
  if (!petId) return [];

  const dateStr = formatDate(date);
  const dayOfWeek = date.getDay();

  return routines
    .filter((r) => r.petId === petId && r.repeatDays.includes(dayOfWeek))
    .map((routine) => {
      const record = findRecord(records, routine.id, dateStr);
      const completedCount = record?.completedCount ?? 0;
      return {
        routine,
        record,
        completedCount,
        remaining: routine.timesPerDay - completedCount,
      };
    });
}

export function calcCompletionRate(items: ChecklistItem[]): number {
  const totalSlots = items.reduce((sum, item) => sum + item.routine.timesPerDay, 0);
  if (totalSlots === 0) return 0;

  const completedSlots = items.reduce((sum, item) => sum + item.completedCount, 0);
  return Math.round((completedSlots / totalSlots) * 100);
}

// TODO: 시간대별 슬롯별 개별 체크 지원
