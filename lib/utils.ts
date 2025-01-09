import { clsx, type ClassValue } from "clsx"
import { parseJsonFile } from "next/dist/build/load-jsconfig"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date:string){
    return new Date(date).toLocaleDateString('en-us', {
      month:"short",
      day:"numeric",
      year:"numeric"
    })
}

export function parseServerActionResponse<T>(response:T){
 return JSON.parse(JSON.stringify(response))
}