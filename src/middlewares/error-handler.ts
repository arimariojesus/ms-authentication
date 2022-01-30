import { NextFunction, Request, Response } from "express";
import DatabaseError from "../models/errors/database";
import ForbiddenError from "../models/errors/forbidden";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof DatabaseError) {
    res.sendStatus(400);
  } else if (error instanceof ForbiddenError) {
    res.sendStatus(403);
  } else {
    res.sendStatus(500);
  }
}