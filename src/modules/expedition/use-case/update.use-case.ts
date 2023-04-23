import { objClean } from "@point-hub/express-utils";
import { ExpeditionsEntity } from "../model/expedition.entity.js";
import { UpdateExpeditionsRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateExpeditionsUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const expeditionsEntity = new ExpeditionsEntity({
        name: document.name,
        code: document.code,
        address: document.address,
        phone: document.phone,
        email: document.email,
        contactPerson: document.contactPerson,
        bank: document.bank,
        updatedAt: new Date(),
      });

      const updateExpeditionsRepository = new UpdateExpeditionsRepository(this.db);
      await updateExpeditionsRepository.handle(id, objClean(expeditionsEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
