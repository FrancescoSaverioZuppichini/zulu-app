import { tool } from "ai";
import z from "zod";
import { mamalPodMissions } from "./personas";

export const tools = {
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
      const nextMissions = mamalPodMissions.filter(mission => {
        // Check if all required missions are completed
        return mission.required_missions.every(requiredId =>
          completedMissions.includes(requiredId)
        );
      });
      console.log(missiong_id, completed);
      // const currentMission = mamalPodMissions.at(Number(missiong_id));
      // console.log(currentMission);
      // if (!currentMission) return "DIOCANE";
      // if (!currentMission?.next_missions)
      //   return "Last mission was completed. Game finished.";
      // const nextMissions = mamalPodMissions.filter((el) =>
      //   currentMission.next_missions?.includes(el.mission_id)
      // );
      // console.log(nextMissions, "DIOCANE");
      return {}
    },
  }),
};
