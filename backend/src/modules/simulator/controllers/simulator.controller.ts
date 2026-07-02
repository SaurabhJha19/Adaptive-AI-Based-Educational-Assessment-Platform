import { Request, Response } from "express";
import simulatorService from "../services/simulator.service";

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
    const exam = await simulatorService.getExam(req.params.id);
    res.json(exam);
    }
}

export default new SimulatorController();