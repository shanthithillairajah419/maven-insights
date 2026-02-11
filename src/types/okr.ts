export interface Okr {
  name: string;
  dueDate: string;
  percentComplete: number;
  status?: "green" | "yellow" | "red";
}
