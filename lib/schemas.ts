import { z } from "zod";

export const createMissionSchema = z.object({
  required_missions: z.array(z.string()),
  mission_id: z.string(),
  type: z.string(),
  primary_objective: z.string(),
  context: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  hints: z.array(z.string()),
  success_criteria: z.string(),
});
