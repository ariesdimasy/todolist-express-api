import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import todoRouter from "./src/routes/todo.route";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./src/middlewares/error.middleware";

// Load environment variables
dotenv.config();

// =============================================
// Express Application Setup
// =============================================

const app: Application = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Todo List API is running 🚀",
    version: "1.0.0",
    endpoints: {
      todos: "/api/todos",
    },
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/todos", todoRouter);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use(notFoundMiddleware);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorMiddleware);

export default app;
