export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date | string;
  type: string;
  link?: string;
}
