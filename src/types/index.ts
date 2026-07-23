import type { Pet } from "./pet";
import type { Routine } from "./routine";
import type { DailyRecord } from "./record";

export type { Pet, Routine, DailyRecord };

export interface AppSettings {
  selectedPetId: string | null;
}

export interface AppStorage {
  pets: Pet[];
  routines: Routine[];
  records: DailyRecord[];
  settings: AppSettings;
}
