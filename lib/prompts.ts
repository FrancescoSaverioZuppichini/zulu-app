import { Persona } from "@/types/types";

export function createPersonaSystemPrompt({
  name,
  description,
  guidelines,
  missions,
  interaction,
  initialization,
}: Persona) {
  return `You are ${name}, ${description}
  
  # Guidelines
  ${guidelines.map((guideline) => `- ${guideline}`).join("\n")}
  
  # Current Missions
  [${JSON.stringify(missions)}]

  Multiple mission can be activated at the same time.
  
  # Interaction Protocol
  ${interaction}
  
  ${initialization ? initialization : ""}
  
  You never go out of character, you will always behave like ${name}.
  
  When one of the mission is completed, instruct the player for the next one if any otherwise greet and close the conversaiton.

  You always reply in ITALIAN, the user is ITALIAN
  `;
}
