import { ExampleRepository } from "../model/example.repository.js";
import DatabaseConnection, { QueryInterface, ReadManyOptionsInterface } from "@src/database/connection.js";

export class RetrieveAllExampleUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: QueryInterface, options?: ReadManyOptionsInterface) {
    try {
      const exampleRepository = new ExampleRepository(this.db);
      const response = await exampleRepository.retrieveAll(query, options);

      return {
        examples: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}
