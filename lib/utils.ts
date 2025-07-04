import { Mission } from "@/types/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { missions } from "./missions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/png;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = reject;
  });
};

export const getUserActiveMissions = (userMissions: Mission[], completedMissionsIds: string[]): Mission[] => {
  let activeMissions: Mission[];
  if (completedMissionsIds.length === 0) {
    activeMissions = userMissions.filter(mission => mission.required_missions.length === 0)
  }
  else {

    activeMissions = userMissions.filter(mission => {
      if (mission.required_missions.length === 0) return false
      return mission.required_missions.every(requiredId =>
        completedMissionsIds.includes(requiredId) && !completedMissionsIds.includes(mission.mission_id)
      );
    });
  }
  return activeMissions
}

