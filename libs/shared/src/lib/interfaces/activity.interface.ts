export interface Activity {
  date: Date;
  value: { agent: string; status: string; mission?: string }[];
}