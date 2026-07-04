import { Router } from "express";
import {authenticate} from "../../../middleware/auth.middleware";
import simulatorController from "../controllers/simulator.controller";

const router = Router();

router.get("/types", simulatorController.getExamTypes);

router.get("/exams", simulatorController.getExams);

router.get("/exams/:id", simulatorController.getExam);

router.post("/start/:id", authenticate, simulatorController.startExam);

router.get("/attempt/:id", authenticate, simulatorController.getAttempt);

export default router;