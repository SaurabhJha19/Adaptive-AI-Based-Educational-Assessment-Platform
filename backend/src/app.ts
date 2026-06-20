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


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use(
  "/api/questions",
  questionRoutes
);

app.use("/api/documents", documentRoutes);

app.use(
  "/api/exams",
  examRoutes
);

app.use(
  "/api/exams",
  examAttemptRoutes
);

app.use(
  "/api/feedback",
  feedbackRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

app.use(errorHandler);

export default app;