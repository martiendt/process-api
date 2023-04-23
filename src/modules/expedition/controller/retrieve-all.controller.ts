import { NextFunction, Request, Response } from "express";
import { RetrieveAllExpeditionsUseCase } from "../use-case/retrieve-all.use-case.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const retrieveAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createExpeditionsUseCase = new RetrieveAllExpeditionsUseCase(db);
    const result = await createExpeditionsUseCase.handle(req.query as unknown as QueryInterface);

    res.status(200).json({
      expeditions: result.expeditions,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
