import { type ClassValue, clsx } from 'clsx'

export const getCurrentTimeInUkraine = () => {
  const now = new Date().toLocaleString("en-US", { timeZone: "Europe/Kiev" });
  return new Date(now);
};

export const isWorkingHoursInUkraine = () => {
  const now = getCurrentTimeInUkraine();
  const localTime = now.getHours();

  const isWeekday = now.getDay() >= 1 && now.getDay() <= 5; // Monday to Friday
  const isWorkHours = localTime >= 8 && localTime < 18;

  return isWeekday && isWorkHours;
};


export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
