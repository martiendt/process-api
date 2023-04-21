import { objClean } from "@point-hub/express-utils";
import { ExpeditionsEntity } from "../model/expedition.entity.js";
import { CreateExpeditionsRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateExpeditionsUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // save to database
      const expeditionsEntity = objClean(
        new ExpeditionsEntity({
          name: document.name,
          code: document.code,
          address: document.address,
          phone: document.phone,
          email: document.email,
          contactPerson: document.contactPerson,
          bank: document.bank,
          createdAt: new Date(),
        })
      );

      const response = await new CreateExpeditionsRepository(this.db).handle(expeditionsEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
