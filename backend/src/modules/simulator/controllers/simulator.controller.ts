import { Request, Response } from "express";
import simulatorService from "../services/simulator.service";
import startSimulatorService from "../services/start-simulator.service";
import {ExamAttemptModel} from "../../../models/exam-attempt.model";
import getAttemptSourceService from "../../../services/get-attempt-source.service";
import submitAttemptService from "../services/submit-attempt.service";
import getResultService from "../services/get-result.service";
import saveAnswerService
from "../services/save-answer.service";


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

export async function submitAttempt(

    req: Request<{ id: string }>,
    res: Response

) {

    const result =
        await submitAttemptService.execute(
            req.params.id
        );

    res.json(result);

}

export async function getResult(

    req: Request<{ id: string }>,
    res: Response

) {

    const result =
        await getResultService.execute(
            req.params.id
        );

    res.json({

    attempt: result,

});

}

export async function saveAnswer(

    req: Request<{ id: string }>,
    res: Response

) {

    const result =
        await saveAnswerService.execute(

            req.params.id,

            req.body

        );

    res.json(result);

}

export default new SimulatorController();