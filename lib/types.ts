import { InferUITools, UIMessage, UIDataTypes } from 'ai';
import { tools } from './tools';

// Infer the type of the tool returned by tools.execute_code
type MissionTrackerTool = ReturnType<typeof tools.mission_tracker>;
type MissionIntrosTool = typeof tools.introduce_next_missions;

// Define MyUITools with the inferred tool type
export type MyUITools = InferUITools<{ mission_tracker: MissionTrackerTool, introduce_next_missions: MissionIntrosTool }>;

export type MyUIMessage = UIMessage<{ createdAt: Date }, UIDataTypes, MyUITools>;

export interface Contact {
  id: string
  name: string
  phone: string
  avatar: string
}

