import { Request, Response, NextFunction } from "express";

// =============================================
// Global Error Handler Middleware
// =============================================

export interface AppError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500;

  // Handle Prisma known errors
  const message = err.message || "Terjadi kesalahan pada server";

  // Determine appropriate status code based on error message
  let httpStatus = statusCode;

  if (
    message.includes("tidak ditemukan") ||
    message.includes("Record to update not found") ||
    message.includes("Record to delete not found")
  ) {
    httpStatus = 404;
  } else if (
    message.includes("tidak boleh kosong") ||
    message.includes("harus diisi")
  ) {
    httpStatus = 400;
  }

  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);

  res.status(httpStatus).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFoundMiddleware = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
};
