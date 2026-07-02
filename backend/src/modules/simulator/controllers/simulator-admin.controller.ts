import { Request, Response } from "express";

import simulatorService from "../services/simulator.service";

class SimulatorAdminController {
  async create(req: Request, res: Response) {

    const {
    title,
    examCode,
    examType,
    pdfUrl,
    } = req.body;

    if (!title || !examCode || !examType || !pdfUrl) {
    return res.status(400).json({
        message:
        "title, examCode, examType and pdfUrl are required",
    });
    }

    const exam = await simulatorService.create(req.body);

    res.status(201).json(exam);
  }

  async review(req: Request<{ id: string }>, res: Response) {
    const exam = await simulatorService.getExam(req.params.id);

    res.json(exam);
  }

  async update(req: Request<{ id: string }>, res: Response) {
    const exam = await simulatorService.update(
      req.params.id,
      req.body
    );

    res.json(exam);
  }

  async publish(req: Request<{ id: string }>, res: Response) {
    const exam = await simulatorService.publish(req.params.id);

    res.json(exam);
  }

  async archive(req: Request<{ id: string }>, res: Response) {
    const exam = await simulatorService.archive(req.params.id);

    res.json(exam);
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    await simulatorService.delete(req.params.id);

    res.sendStatus(204);
  }
}

export default new SimulatorAdminController();