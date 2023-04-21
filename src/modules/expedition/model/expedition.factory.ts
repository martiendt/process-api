import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { ExpeditionsEntityInterface } from "./expedition.entity.js";
import { CreateManyExpeditionsRepository } from "./repository/create-many.repository.js";
import { CreateExpeditionsRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class ExpeditionsFactory extends Factory<ExpeditionsEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      code: faker.datatype.uuid(),
      address: faker.address.street(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      contactPerson: faker.name.fullName(),
      bank: {
        name: faker.company.name(),
        branch: faker.address.streetName(),
        accountNumber: faker.finance.account(),
        accountName: faker.finance.accountName(),
      },
      createdAt: new Date(),
    };
  }

  async create() {
    const session = db.startSession();

    db.startTransaction();
    const expeditionsRepository = new CreateExpeditionsRepository(db);
    return await expeditionsRepository.handle(this.makeOne(), { session });

    await db.commitTransaction();
    await db.endSession();
  }

  async createMany(count: number) {
    const expeditionsRepository = new CreateManyExpeditionsRepository(db);
    return await expeditionsRepository.handle(this.makeMany(count));
  }
}
