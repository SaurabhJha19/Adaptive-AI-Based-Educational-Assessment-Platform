import { Request, Response } from "express";
import simulatorService from "../services/simulator.service";
import startSimulatorService from "../services/start-simulator.service";
import {ExamAttemptModel} from "../../../models/exam-attempt.model";
import getAttemptSourceService from "../../../services/get-attempt-source.service";


class SimulatorController {
  async getExamTypes(req: Request, res: Response) {
    const data = await simulatorService.getExamTypes();

    res.json(data);
  }

    async getExams(req: Request, res: Response) {
    const exams = await simulatorService.getPublishedExams(
        req.query.examType as string | undefined,
        Number(req.query.page ?? 1),
        Number(req.query.limit ?? 20),
        req.query.search as string | undefined

    );

    res.json(exams);
    }
    async getExam(
    req: Request<{ id: string }>,
    res: Response
    ) {
    const exam = await simulatorService.getExam(req.params.id);
    res.json(exam);
    }

    async startExam(
    req: Request<{ id: string }>,
    res: Response
    ) {
    const userId = (req as any).user.userId;

    const result =
        await startSimulatorService.execute(
        userId,
        req.params.id
        );

    res.json(result);
    }


async getAttempt(
  req: Request<{ id: string }>,
  res: Response
) {
  const attempt = await ExamAttemptModel.findById(req.params.id);

  if (!attempt) {
    return res.status(404).json({
      message: "Attempt not found",
    });
  }

  const exam = await getAttemptSourceService.execute(attempt);

  res.json({
    attempt,
    exam,
  });
}

}

export default new SimulatorController();