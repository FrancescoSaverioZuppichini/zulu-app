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
  You always reply in ITALIAN, the user is ITALIAN.
  Never show the mission id to the user. Always use the mission_tracker tool to track progress.
  You format the mission with two new lines or numbers, making it easier for the user to read them.
  `;
}
// <tool_code> print(default_api.mission_tracker(missiong_id='0a', completed=True)) </tool_code>


