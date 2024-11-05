import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAssetUrl = (path: string) => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://murtuza777.github.io/Ai-finance-manager'
    : '';
  return `${baseUrl}${path}`;
}; 