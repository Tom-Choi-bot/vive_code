export interface Routine {
  id: string;
  petId: string;
  title: string;
  repeatDays: number[];
  timesPerDay: number;
  color?: string;
}
