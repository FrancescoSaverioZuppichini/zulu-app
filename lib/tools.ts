import { tool } from "ai";
import z from "zod";
import { saveUserMission } from "./crud";
import { missions } from "./missions";
import { Mission } from "@/types/types";
import { getUserActiveMissions } from "./utils";

const mission_tracker = (userId: string, contactId: string, completedMissionsIds: string[]) => tool({
  description:
    "You MUST call this tool to records missions completion status by their ID. It will returns active missions. Only call it when a user complete a mission using the success_criteria.",
  inputSchema: z.object({
    mission_id: z.string().describe("The ID of the mission."),
  }),
  execute: async ({ mission_id }): Promise<Mission[] | string> => {
    const userMissions = missions[userId]
    console.log("[TOOL]", mission_id, userMissions)
    const missionExists = userMissions.find(el => el.mission_id === mission_id)
    if (!missionExists) return "This mission id doesn't exist, please continue with the currently active missions"
    if (!completedMissionsIds.includes(mission_id)) await saveUserMission(userId, contactId, mission_id)
    completedMissionsIds.push(mission_id)

    const nextMissions = getUserActiveMissions(userMissions, completedMissionsIds)
    if (completedMissionsIds.length === userMissions.length) return "All missions done, congratulate to the user and tell him all the missions are completed."
    console.log("[TOOL]", nextMissions)
    return nextMissions
  },
})

const introduce_next_missions = tool({
  description: "After you used the `mission_tracker` tool you call this tool to introduce the next missions to the user",
  inputSchema: z.object({ text: z.string().describe("An intro to the next missions the user has to do.") }),
  execute: async ({ text }) => {
    return "user notified."
  }
})

export const tools = { mission_tracker, introduce_next_missions }
