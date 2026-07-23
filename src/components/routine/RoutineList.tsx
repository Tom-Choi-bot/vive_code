import type { Pet, Routine } from "../../types";
import { getDayLabel } from "../../utils/date";

interface RoutineListProps {
  routines: Routine[];
  pets: Pet[];
  onEdit: (routine: Routine) => void;
  onDelete: (routine: Routine) => void;
}

export function RoutineList({ routines, pets, onEdit, onDelete }: RoutineListProps) {
  const getPetName = (petId: string) =>
    pets.find((p) => p.id === petId)?.name ?? "알 수 없음";

  const WEEK_DAYS = [1, 2, 3, 4, 5, 6, 0]; // 월~일
  const dayLetters = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {routines.map((routine, index) => {
        const rotation = index % 2 === 0 ? "rotate-[1deg]" : "rotate-[-1deg]";
        return (
          <article 
            key={routine.id} 
            className={`bg-surface-bright border border-paper-shadow p-6 rounded-lg shadow-[3px_3px_0_0_#E8E4D6] relative ${rotation} crinkle-texture hover:-translate-y-1 transition-transform`}
          >
            {index % 3 === 0 && <div className="absolute top-[-10px] right-[20px] w-[60px] h-[24px] bg-tape-blue opacity-70 rotate-[3deg] shadow-[1px_1px_2px_rgba(0,0,0,0.1)]"></div>}
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2" style={{ color: routine.color ?? "inherit" }}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                <h4 className="font-headline-md text-headline-md text-ink-black">{routine.title}</h4>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => onEdit(routine)} className="text-on-surface-variant opacity-50 hover:opacity-100 hover:text-primary transition-opacity">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button type="button" onClick={() => onDelete(routine)} className="text-on-surface-variant opacity-50 hover:opacity-100 hover:text-stamp-red transition-opacity">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
            
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 pb-4 border-b border-outline-variant/30 relative">
              For {getPetName(routine.petId)}
            </p>
            
            <div className="flex justify-between items-center mb-4">
              <span className="font-label-md text-label-md text-on-surface-variant">Repeat</span>
              <div className="flex gap-1">
                {WEEK_DAYS.map((day, i) => {
                  const isActive = routine.repeatDays.includes(day);
                  return (
                    <span 
                      key={day}
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-caption text-[10px] ${
                        isActive 
                          ? "bg-primary-fixed text-on-primary-fixed-variant font-bold" 
                          : "bg-surface-container-highest text-on-surface-variant"
                      }`}
                    >
                      {dayLetters[i]}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-md border border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-outline text-[18px]">schedule</span>
                <span className="font-body-md text-body-md">Daily Goal</span>
              </div>
              <span className="font-label-md text-label-md text-primary bg-primary-fixed-dim/30 px-2 py-1 rounded">
                {routine.timesPerDay}x Daily
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
