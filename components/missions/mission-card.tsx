import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mission } from "@/types/types";

export function MissionCard({
  mission,
  isAdmin = false,
}: {
  mission: Mission;
  isAdmin?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <p className="font-mono text-sm">
          id: <span className="font-bold">{mission.mission_id}</span>
        </p>
        <CardTitle className="text-xl font-medium">
          {mission.primary_objective}
        </CardTitle>
        <CardDescription>{mission.context}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Difficulty: {mission.difficulty}</p>
        <p>Required Ids: {`[${mission.required_missions.join(" ")}]`}</p>
        {isAdmin && <p>Success Criteria: {mission.success_criteria}</p>}
      </CardContent>
    </Card>
  );
}
