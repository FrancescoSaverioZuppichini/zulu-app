import { tool } from "ai";
import z from "zod";
import { saveUserMission } from "./crud";
import { mamalPodMissions } from "./missions";

export const tools = (userId: string, contactId: string, completedMissionsIds: string[]) => ({
  mission_tracker: tool({
    description:
      "Records missions completion status by ID. It will returns new missions.",
    parameters: z.object({
      missiong_id: z.string().describe("The ID of the mission."),
      completed: z
        .boolean()
        .describe("True is the mission was completed, False otherwise."),
    }),
    execute: async ({ missiong_id, completed }) => {
      console.log("[TOOL]", missiong_id, completed)
      if (!completed) return "Mission not completed, help the user with hints."
      if (!completedMissionsIds.includes(missiong_id)) await saveUserMission(userId, contactId, missiong_id)
      completedMissionsIds.push(missiong_id)
      const nextMissions = mamalPodMissions.filter(mission => {
        if (mission.required_missions.length === 0) return false
        return mission.required_missions.every(requiredId =>
          completedMissionsIds.includes(requiredId)
        );
      });
      console.log("[TOOL]", nextMissions)
      if (completedMissionsIds.length === mamalPodMissions.length) return "All missions done, congratulate to the user and tell him all the missions are completed."
      return nextMissions
    },
  }),
})
