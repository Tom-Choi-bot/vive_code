import { useState, type FormEvent, type ChangeEvent } from "react";
import type { Pet } from "../../types";
import { Button } from "../common/Button";

interface PetFormProps {
  initial?: Pet;
  onSubmit: (data: Omit<Pet, "id">) => void;
  onCancel: () => void;
}

const EMOJI_OPTIONS = ["🐕", "🐩", "🦮", "🐈", "🐱", "🐾"];

export function PetForm({ initial, onSubmit, onCancel }: PetFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [species, setSpecies] = useState<"dog" | "cat">(initial?.species ?? "dog");
  const [breed, setBreed] = useState(initial?.breed ?? "");
  const [birthDate, setBirthDate] = useState(initial?.birthDate ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "🐕");
  const [photoBase64, setPhotoBase64] = useState(initial?.photoBase64 ?? "");

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setPhotoBase64(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      species,
      breed: breed.trim() || undefined,
      birthDate: birthDate || undefined,
      emoji,
      photoBase64: photoBase64 || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <label className="cursor-pointer">
          {photoBase64 ? (
            <img src={photoBase64} alt="Profile" className="h-20 w-20 rounded-full object-cover shadow-sm" />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl shadow-sm">
              {emoji}
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
        </label>
        <div className="flex gap-2">
          <p className="text-xs text-gray-500">프로필 사진 (선택)</p>
          {photoBase64 && (
            <button type="button" onClick={() => setPhotoBase64("")} className="text-xs text-red-500 hover:underline">
              삭제
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">이름 *</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="반려동물 이름"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">종 *</label>
        <div className="flex gap-3">
          {(["dog", "cat"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpecies(s)}
              className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-colors ${
                species === s
                  ? "border-primary bg-orange-50 text-primary"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              {s === "dog" ? "🐕 강아지" : "🐈 고양이"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">이모지</label>
        <div className="flex gap-2">
          {EMOJI_OPTIONS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setEmoji(e)}
              className={`min-h-11 min-w-11 rounded-xl text-xl ${
                emoji === e ? "bg-orange-100 ring-2 ring-primary" : "bg-gray-50"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">품종</label>
        <input
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="품종 (선택)"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">생일</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" className="flex-1" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" className="flex-1">
          {initial ? "수정" : "등록"}
        </Button>
      </div>
    </form>
  );
}
