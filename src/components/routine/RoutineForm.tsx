import { useState, type FormEvent } from "react";
import type { Pet, Routine } from "../../types";
import { WEEKDAY_OPTIONS } from "../../utils/date";
import { Button } from "../common/Button";

interface RoutineFormProps {
  pets: Pet[];
  initial?: Routine;
  onSubmit: (data: Omit<Routine, "id">) => void;
  onCancel: () => void;
}

const COLOR_OPTIONS = [
  "#f97316",
  "#ef4444",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
];

export function RoutineForm({ pets, initial, onSubmit, onCancel }: RoutineFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [petId, setPetId] = useState(initial?.petId ?? pets[0]?.id ?? "");
  const [repeatDays, setRepeatDays] = useState<number[]>(initial?.repeatDays ?? [1, 2, 3, 4, 5]);
  const [timesPerDay, setTimesPerDay] = useState(initial?.timesPerDay ?? 1);
  const [color, setColor] = useState(initial?.color ?? COLOR_OPTIONS[0]);

  const toggleDay = (day: number) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort(),
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !petId || repeatDays.length === 0) return;

    onSubmit({
      title: title.trim(),
      petId,
      repeatDays,
      timesPerDay: Math.max(1, timesPerDay),
      color,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">루틴명 *</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="예: 아침 사료, 산책, 약"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">반려동물 *</label>
        <select
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.emoji ?? "🐾"} {pet.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">반복 요일 *</label>
        <div className="flex flex-wrap gap-2">
          {WEEKDAY_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleDay(value)}
              className={`min-h-11 min-w-11 rounded-full text-sm font-medium transition-colors ${
                repeatDays.includes(value)
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">하루 수행 횟수 *</label>
        <input
          type="number"
          min={1}
          max={10}
          value={timesPerDay}
          onChange={(e) => setTimesPerDay(Number(e.target.value))}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">색상</label>
        <div className="flex gap-2">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`h-10 w-10 rounded-full transition-transform ${
                color === c ? "scale-110 ring-2 ring-gray-400 ring-offset-2" : ""
              }`}
              style={{ backgroundColor: c }}
              aria-label={`색상 ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" className="flex-1" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" className="flex-1">
          {initial ? "수정" : "추가"}
        </Button>
      </div>
    </form>
  );
}
