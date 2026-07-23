import { formatDate, getCalendarGrid, isSameDay, isToday } from "../../utils/date";
import type { DaySummary } from "../../utils/calendar";

interface CalendarGridProps {
  year: number;
  month: number;
  selectedDate: Date;
  monthSummaries: Map<string, DaySummary>;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const DAY_HEADERS = ["일", "월", "화", "수", "목", "금", "토"];

export function CalendarGrid({
  year,
  month,
  selectedDate,
  monthSummaries,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: CalendarGridProps) {
  const grid = getCalendarGrid(year, month);

  return (
    <div className="px-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevMonth}
          className="min-h-11 min-w-11 rounded-xl text-gray-600 hover:bg-gray-100"
          aria-label="이전 달"
        >
          ‹
        </button>
        <h2 className="text-lg font-bold text-gray-900">
          {year}년 {month + 1}월
        </h2>
        <button
          type="button"
          onClick={onNextMonth}
          className="min-h-11 min-w-11 rounded-xl text-gray-600 hover:bg-gray-100"
          aria-label="다음 달"
        >
          ›
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAY_HEADERS.map((d) => (
          <div key={d} className="py-2 text-center text-xs font-medium text-gray-400">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} />;
          }

          const dateStr = formatDate(date);
          const summary = monthSummaries.get(dateStr);
          const selected = isSameDay(date, selectedDate);
          const today = isToday(date);

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelectDate(date)}
              className={`relative flex min-h-11 flex-col items-center justify-center rounded-xl text-sm transition-colors ${
                selected
                  ? "bg-primary text-white"
                  : today
                    ? "bg-orange-50 text-primary font-bold"
                    : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {date.getDate()}
              {summary && (
                <span
                  className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${
                    selected
                      ? "bg-white"
                      : summary.rate === 100
                        ? "bg-green-500"
                        : summary.rate > 0
                          ? "bg-orange-400"
                          : "bg-gray-300"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
