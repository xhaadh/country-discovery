// server/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err?.message || err);
  if (err?.response?.status === 404) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(500).json({ message: "Internal server error" });
}
