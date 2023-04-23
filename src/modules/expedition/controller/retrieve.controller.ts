import { NextFunction, Request, Response } from "express";
import { RetrieveExpeditionsUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCoaCategoiresUseCase = new RetrieveExpeditionsUseCase(db);
    const result = await createCoaCategoiresUseCase.handle(req.params.id);

    res.status(200).json({
      _id: result._id,
      name: result.name,
      code: result.code,
      address: result.address,
      phone: result.phone,
      email: result.email,
      contactPerson: result.contactPerson,
      bank: result.bank,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};
