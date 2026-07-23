import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppStorage, DailyRecord, Pet, Routine } from "../types";
import { loadStorage, saveStorage } from "../utils/storage";
import { formatDate } from "../utils/date";

interface AppContextValue {
  pets: Pet[];
  routines: Routine[];
  records: DailyRecord[];
  selectedPetId: string | null;
  selectedPet: Pet | null;
  addPet: (pet: Omit<Pet, "id">) => void;
  updatePet: (id: string, data: Partial<Omit<Pet, "id">>) => void;
  deletePet: (id: string) => void;
  addRoutine: (routine: Omit<Routine, "id">) => void;
  updateRoutine: (id: string, data: Partial<Omit<Routine, "id">>) => void;
  deleteRoutine: (id: string) => void;
  setSelectedPetId: (id: string | null) => void;
  toggleCheck: (routineId: string, date: Date) => void;
  uncheckLast: (routineId: string, date: Date) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function generateId(): string {
  return crypto.randomUUID();
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [storage, setStorage] = useState<AppStorage>(() => loadStorage());

  useEffect(() => {
    saveStorage(storage);
  }, [storage]);

  const selectedPet = useMemo(
    () => storage.pets.find((p) => p.id === storage.settings.selectedPetId) ?? null,
    [storage.pets, storage.settings.selectedPetId],
  );

  const addPet = useCallback((pet: Omit<Pet, "id">) => {
    const newPet: Pet = { ...pet, id: generateId() };
    setStorage((prev) => {
      const pets = [...prev.pets, newPet];
      const selectedPetId =
        prev.settings.selectedPetId ?? (pets.length === 1 ? newPet.id : null);
      return { ...prev, pets, settings: { selectedPetId } };
    });
  }, []);

  const updatePet = useCallback((id: string, data: Partial<Omit<Pet, "id">>) => {
    setStorage((prev) => ({
      ...prev,
      pets: prev.pets.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }));
  }, []);

  const deletePet = useCallback((id: string) => {
    setStorage((prev) => {
      const pets = prev.pets.filter((p) => p.id !== id);
      const routines = prev.routines.filter((r) => r.petId !== id);
      const keptRoutineIds = new Set(routines.map((r) => r.id));
      const records = prev.records.filter((r) => keptRoutineIds.has(r.routineId));
      const selectedPetId =
        prev.settings.selectedPetId === id
          ? (pets[0]?.id ?? null)
          : prev.settings.selectedPetId;

      return { ...prev, pets, routines, records, settings: { selectedPetId } };
    });
  }, []);

  const addRoutine = useCallback((routine: Omit<Routine, "id">) => {
    setStorage((prev) => ({
      ...prev,
      routines: [...prev.routines, { ...routine, id: generateId() }],
    }));
  }, []);

  const updateRoutine = useCallback((id: string, data: Partial<Omit<Routine, "id">>) => {
    setStorage((prev) => ({
      ...prev,
      routines: prev.routines.map((r) => (r.id === id ? { ...r, ...data } : r)),
    }));
  }, []);

  const deleteRoutine = useCallback((id: string) => {
    setStorage((prev) => ({
      ...prev,
      routines: prev.routines.filter((r) => r.id !== id),
      records: prev.records.filter((r) => r.routineId !== id),
    }));
  }, []);

  const setSelectedPetId = useCallback((id: string | null) => {
    setStorage((prev) => ({
      ...prev,
      settings: { selectedPetId: id },
    }));
  }, []);

  const toggleCheck = useCallback((routineId: string, date: Date) => {
    const dateStr = formatDate(date);
    setStorage((prev) => {
      const routine = prev.routines.find((r) => r.id === routineId);
      if (!routine) return prev;

      const existing = prev.records.find(
        (r) => r.routineId === routineId && r.date === dateStr,
      );

      if (existing && existing.completedCount >= routine.timesPerDay) {
        return prev;
      }

      const now = new Date().toISOString();

      if (existing) {
        return {
          ...prev,
          records: prev.records.map((r) =>
            r.id === existing.id
              ? {
                  ...r,
                  completedCount: r.completedCount + 1,
                  completionTimes: [...r.completionTimes, now],
                }
              : r,
          ),
        };
      }

      const newRecord: DailyRecord = {
        id: generateId(),
        routineId,
        date: dateStr,
        completedCount: 1,
        completionTimes: [now],
      };

      return { ...prev, records: [...prev.records, newRecord] };
    });
  }, []);

  const uncheckLast = useCallback((routineId: string, date: Date) => {
    const dateStr = formatDate(date);
    setStorage((prev) => {
      const existing = prev.records.find(
        (r) => r.routineId === routineId && r.date === dateStr,
      );
      if (!existing || existing.completedCount === 0) return prev;

      if (existing.completedCount === 1) {
        return {
          ...prev,
          records: prev.records.filter((r) => r.id !== existing.id),
        };
      }

      return {
        ...prev,
        records: prev.records.map((r) =>
          r.id === existing.id
            ? {
                ...r,
                completedCount: r.completedCount - 1,
                completionTimes: r.completionTimes.slice(0, -1),
              }
            : r,
        ),
      };
    });
  }, []);

  const value: AppContextValue = {
    pets: storage.pets,
    routines: storage.routines,
    records: storage.records,
    selectedPetId: storage.settings.selectedPetId,
    selectedPet,
    addPet,
    updatePet,
    deletePet,
    addRoutine,
    updateRoutine,
    deleteRoutine,
    setSelectedPetId,
    toggleCheck,
    uncheckLast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}

// TODO: debounced save, import/export 백업
