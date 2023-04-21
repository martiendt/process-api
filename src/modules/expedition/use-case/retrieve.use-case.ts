import { RetrieveExpeditionsRepository } from "../model/repository/retrieve.repository.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";

interface BankEntityInterface {
  name?: string;
  branch?: string;
  accountNumber?: string;
  accountName?: string;
}

interface ResponseInterface {
  _id?: string;
  name?: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
  bank?: BankEntityInterface;
  createdAt?: Date;
  updatedAt?: Date;
}

export class RetrieveExpeditionsUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      const response = await new RetrieveExpeditionsRepository(this.db).handle(id, options);

      return {
        _id: response._id,
        name: response.name,
        code: response.code,
        address: response.address,
        phone: response.phone,
        email: response.email,
        contactPerson: response.contactPerson,
        bank: response.bank,
        createdAt: response.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
