import { formatDisplayDate } from "../../utils/date";
import { ChecklistItemCard } from "../today/ChecklistItem";
import type { ChecklistItem } from "../../utils/checklist";
import { EmptyState } from "../common/EmptyState";

interface DayRecordsProps {
  date: Date;
  items: ChecklistItem[];
}

export function DayRecords({ date, items }: DayRecordsProps) {
  return (
    <div className="px-4 pb-4">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        {formatDisplayDate(date)} 기록
      </h3>

      {items.length === 0 ? (
        <EmptyState
          emoji="📭"
          title="이 날의 루틴이 없어요"
          description="선택한 반려동물에게 해당 요일의 루틴이 없습니다."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ChecklistItemCard key={item.routine.id} item={item} date={date} />
          ))}
        </div>
      )}
    </div>
  );
}
