import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReasonNumber(num: number): string {
  return `#${num.toString().padStart(3, "0")}`;
}
