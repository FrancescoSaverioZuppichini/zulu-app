import { tool } from "ai";
import z from "zod";
import { saveUserMission } from "./crud";
import { missions } from "./missions";

export const tools = (userId: string, contactId: string, completedMissionsIds: string[]) => ({
  mission_tracker: tool({
    description:
      "Records missions completion status by ID. It will returns new missions. Only call it when a user complete a mission using the success_criteria.",
    parameters: z.object({
      missiong_id: z.string().describe("The ID of the mission."),
    }),
    execute: async ({ missiong_id }) => {
      const userMissions = missions[userId]
      console.log("[TOOL]", missiong_id)
      if (!completedMissionsIds.includes(missiong_id)) await saveUserMission(userId, contactId, missiong_id)
      completedMissionsIds.push(missiong_id)
      const nextMissions = userMissions.filter(mission => {
        if (mission.required_missions.length === 0) return false
        return mission.required_missions.every(requiredId =>
          completedMissionsIds.includes(requiredId)
        );
      });
      console.log("[TOOL]", nextMissions)
      if (completedMissionsIds.length === userMissions.length) return "All missions done, congratulate to the user and tell him all the missions are completed."
      return nextMissions
    },
  }),
})
