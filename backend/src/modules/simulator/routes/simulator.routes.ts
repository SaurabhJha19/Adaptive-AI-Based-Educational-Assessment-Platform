import { Router } from "express";

import simulatorController from "../controllers/simulator.controller";

const router = Router();

router.get("/types", simulatorController.getExamTypes);

router.get("/exams", simulatorController.getExams);

router.get("/exams/:id", simulatorController.getExam);

router.post("/start/:id", simulatorController.startExam);

router.get("/attempt/:id", simulatorController.getAttempt);

export default router;