import type { AppStorage } from "../types";

const STORAGE_KEY = "dang-care-calendar";

export const defaultStorage = (): AppStorage => ({
  pets: [],
  routines: [],
  records: [],
  settings: { selectedPetId: null },
});

export function loadStorage(): AppStorage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStorage();

    const parsed = JSON.parse(raw) as AppStorage;
    return {
      pets: parsed.pets ?? [],
      routines: parsed.routines ?? [],
      records: parsed.records ?? [],
      settings: parsed.settings ?? { selectedPetId: null },
    };
  } catch {
    // TODO: 손상된 데이터 복구 또는 마이그레이션
    return defaultStorage();
  }
}

export function saveStorage(data: AppStorage): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
