import { type ClassValue, clsx } from 'clsx';

export const getCurrentTimeInUkraine = () => {
  const now = new Date().toLocaleString('en-US', { timeZone: 'Europe/Kiev' });
  return new Date(now);
};

export const isWorkingHoursInUkraine = () => {
  const now = getCurrentTimeInUkraine();
  const localTime = now.getHours();

  const isWeekday = now.getDay() >= 1 && now.getDay() <= 5; // Monday to Friday
  const isWorkHours = localTime >= 8 && localTime < 18;

  return isWeekday && isWorkHours;
};

const CAREER_START = new Date(2021, 5, 1); // June 2021

export const getYearsOfExperience = (now = new Date()) => {
  const months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
    now.getMonth() -
    CAREER_START.getMonth();
  return Math.floor(months / 12);
};

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
