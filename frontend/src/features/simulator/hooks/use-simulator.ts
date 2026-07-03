import { useQuery } from "@tanstack/react-query";

import simulatorService from "../simulator.service";
import { OfficialExam } from "../types";

export function useSimulator(examType?: string) {
  return useQuery<OfficialExam[]>({
    queryKey: ["simulator", examType],
    queryFn: () => simulatorService.getPublishedExams(examType),
  });
}