import { MyUITools } from "@/lib/types";
import { MemoizedMarkdown } from "./memoized-markdown";
import { MissionCard } from "../missions/mission-card";
import { UIMessagePart, UIDataTypes } from "ai";
import { missions } from "@/lib/missions";
import { Mission } from "@/types/types";

export function MessagePart({
  part,
  id,
}: {
  part: UIMessagePart<UIDataTypes, MyUITools>;
  id: string;
}) {
  switch (part.type) {
    case "text": {
      return <MemoizedMarkdown content={part.text} id={id} />;
    }
    case "file": {
      if (part.mediaType === "image/png") {
        return <img src={part.url} className="w-[300px]" />;
      }
      return;
    }
    case "tool-mission_tracker": {
      const missionId = part.input?.mission_id;
      const allMissions = Object.values(missions).flat();
      const mission = allMissions.find((m) => m.mission_id === missionId);

      if (!mission) {
        return <div>Mission not found</div>;
      }

      return (
        <p className="font-mono text-xs bg-card p-1 mt-1 rounded-sm">
          ✅ mission {missionId} completed! Getting next missions...
        </p>
      );
    }
    case "tool-introduce_next_missions": {
      const text = part.input?.text;
      return <p>{text}</p>;
    }
    default: {
      return null;
    }
  }
}
