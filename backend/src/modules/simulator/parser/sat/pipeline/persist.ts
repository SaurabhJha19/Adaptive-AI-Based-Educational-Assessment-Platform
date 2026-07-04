import { SimulatorStatus } from "../../../constants/simulator-status.enum";
import { IOfficialExam } from "../../../models/official-exam.model";

export async function persistExam(
  exam: IOfficialExam
): Promise<IOfficialExam> {

  exam.status =
    SimulatorStatus.REVIEW;

  await exam.save();

  return exam;

}