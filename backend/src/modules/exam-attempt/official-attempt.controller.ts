import { Request, Response, NextFunction } from "express";
import * as officialAttemptService from "./official-attempt.service";

/**
 * Start Attempt
 */
export const startAttempt = async (
  req: Request<{ examId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user!.id;
    const { examId } = req.params;

    const attempt =
      await officialAttemptService.startAttempt(
        userId,
        examId
      );

    res.status(201).json({
      success: true,
      data: attempt,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Save Progress
 */
export const saveAttempt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attemptId = req.params.attemptId as string;;

    const attempt =
      await officialAttemptService.saveAttempt(
        attemptId,
        req.body
      );

    res.json({
      success: true,
      data: attempt,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit Exam
 */
export const submitAttempt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attemptId = req.params.attemptId as string;;

    const result =
      await officialAttemptService.submitAttempt(
        attemptId
      );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Attempt Details
 */
export const getAttempt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attemptId = req.params.attemptId as string;;

    const attempt =
      await officialAttemptService.getAttempt(
        attemptId
      );

    res.json({
      success: true,
      data: attempt,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Result
 */
export const getResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attemptId = req.params.attemptId as string;;

    const result =
      await officialAttemptService.getResult(
        attemptId
      );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * History
 */
export const getMyAttempts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user!.id;

    const attempts =
      await officialAttemptService.getMyAttempts(
        userId
      );

    res.json({
      success: true,
      data: attempts,
    });
  } catch (error) {
    next(error);
  }
};