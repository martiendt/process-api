import request from "supertest";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("create many examples", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to create many examples", async () => {
    const app = await createApp();

    const data = [
      {
        name: "Test 1",
      },
      {
        name: "Test 2",
      },
      {
        name: "Test 3",
      },
    ];

    const response = await request(app).post("/v1/examples/create-many").send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body.insertedCount).toBe(3);
    expect(response.body.insertedIds.length).toBe(3);

    // expect recorded data
    const exampleRecords = await retrieveAll("examples", {
      _id: {
        $in: response.body.insertedIds,
      },
    });

    for (const [index, exampleRecord] of exampleRecords.entries()) {
      expect(exampleRecord._id).toStrictEqual(response.body.insertedIds[index]);
      expect(exampleRecord.name).toStrictEqual(data[index].name);
      expect(exampleRecord.status).toStrictEqual("active");
      expect(exampleRecord.createdAt instanceof Date).toBeTruthy();
    }
  });
});
