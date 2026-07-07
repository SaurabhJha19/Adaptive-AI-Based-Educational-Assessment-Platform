import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import documentRoutes from "./routes/document.routes";
import questionRoutes from "./routes/question.routes";
import examRoutes from "./routes/exam.routes";
import analyticsRoutes from "./routes/analytics.routes";
import feedbackRoutes from "./routes/feedback.routes";
import examAttemptRoutes from "./routes/exam-attempt.routes";
import recommendationRoutes from "./routes/recommendation.routes";
import explainerRoutes from "./routes/explainer.routes";
import topicPerformanceRoutes from "./routes/topic-performance.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import simulatorRoutes from "./modules/simulator/routes/simulator.routes";
import simulatorAdminRoutes from "./modules/simulator/routes/simulator-admin.routes";
import evaluationRoutes from "./routes/evaluation.routes";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/explainer", explainerRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/exam-attempt", examAttemptRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/topic-performance", topicPerformanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/simulator", simulatorRoutes);
app.use("/api/simulator-admin", simulatorAdminRoutes);
app.use("/evaluation", evaluationRoutes);
app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});
app.use(errorHandler);

export default app;