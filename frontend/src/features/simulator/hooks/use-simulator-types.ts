import { useQuery } from "@tanstack/react-query";

import simulatorService from "../simulator.service";

export function useSimulatorTypes() {
  return useQuery({
    queryKey: ["simulator-types"],
    queryFn: simulatorService.getExamTypes,
  });
}