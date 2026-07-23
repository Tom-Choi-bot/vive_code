import { useApp } from "../../contexts/AppContext";
import type { ChecklistItem } from "../../utils/checklist";

interface ChecklistItemProps {
  item: ChecklistItem;
  date: Date;
}

export function ChecklistItemCard({ item, date }: ChecklistItemProps) {
  const { toggleCheck, uncheckLast } = useApp();
  const { routine, completedCount } = item;
  const isComplete = completedCount >= routine.timesPerDay;

  // 도장 효과의 자연스러움을 위해 약간의 무작위 회전 부여
  const randomRotation = Math.floor(Math.random() * 20) - 10;

  return (
    <li className="notebook-line py-4 flex flex-col sm:flex-row sm:items-center justify-between group gap-2">
      <div className="flex items-center gap-4 w-full">
        <div className="flex gap-2 shrink-0">
          {Array.from({ length: routine.timesPerDay }).map((_, index) => {
            const checked = index < completedCount;
            return (
              <input
                key={index}
                type="checkbox"
                checked={checked}
                onChange={() => {
                  if (checked && index === completedCount - 1) {
                    uncheckLast(routine.id, date);
                  } else if (!checked && index === completedCount) {
                    toggleCheck(routine.id, date);
                  }
                }}
                disabled={!checked && index !== completedCount}
                className="checkbox-custom cursor-pointer"
                title={routine.title}
              />
            );
          })}
        </div>
        <span 
          className={`font-body-lg text-body-lg transition-all ${isComplete ? 'text-on-surface-variant line-through opacity-70 group-hover:opacity-100' : 'text-on-surface group-hover:text-primary'}`}
        >
           {routine.title}
           {routine.timesPerDay > 1 && (
             <span className="text-caption ml-2 text-outline" style={{ color: routine.color }}>
               ({completedCount}/{routine.timesPerDay})
             </span>
           )}
        </span>
      </div>
      {isComplete && (
        <div 
          className="stamp-done ml-4 flex-shrink-0 self-end sm:self-auto" 
          style={{ transform: `rotate(${randomRotation}deg)` }}
        >
          DONE
        </div>
      )}
    </li>
  );
}
