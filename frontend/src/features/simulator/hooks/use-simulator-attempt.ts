import { useQuery } from "@tanstack/react-query";

import simulatorService from "../simulator.service";

export function useSimulatorAttempt(id: string) {
  return useQuery({
    queryKey: ["simulator-attempt", id],
    queryFn: () => simulatorService.getAttempt(id),
    enabled: !!id,
  });
}