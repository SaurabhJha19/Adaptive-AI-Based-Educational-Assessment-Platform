import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import documentRoutes from "./routes/document.routes";
import questionRoutes from "./routes/question.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use(
  "/api/questions",
  questionRoutes
);

app.use("/api/documents", documentRoutes);

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

app.use(errorHandler);

export default app;