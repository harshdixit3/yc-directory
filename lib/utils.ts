import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: String) {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
