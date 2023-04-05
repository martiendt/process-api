import { isValid } from "date-fns";
import request from "supertest";
import { ProcessStatusTypes } from "../model/process.entity.js";
import ProcessFactory from "../model/process.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve all processes", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to sort data in ascending order", async () => {
    const app = await createApp();

    const processFactory = new ProcessFactory();
    const data = [
      {
        name: "Process C",
      },
      {
        name: "Process A",
      },
      {
        name: "Process B",
      },
    ];
    processFactory.sequence(data);
    await processFactory.createMany(3);

    const response = await request(app).get(`/v1/processes`).query({
      sort: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.processes.length).toStrictEqual(3);
    expect(response.body.processes[0].name).toStrictEqual(data[1].name);
    expect(response.body.processes[1].name).toStrictEqual(data[2].name);
    expect(response.body.processes[2].name).toStrictEqual(data[0].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to sort data in descending order", async () => {
    const app = await createApp();

    const processFactory = new ProcessFactory();
    const data = [
      {
        name: "Process C",
      },
      {
        name: "Process A",
      },
      {
        name: "Process B",
      },
    ];
    processFactory.sequence(data);
    await processFactory.createMany(3);

    const response = await request(app).get(`/v1/processes`).query({
      sort: "-name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.processes.length).toStrictEqual(3);
    expect(response.body.processes[0].name).toStrictEqual(data[0].name);
    expect(response.body.processes[1].name).toStrictEqual(data[2].name);
    expect(response.body.processes[2].name).toStrictEqual(data[1].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to navigate pagination", async () => {
    const app = await createApp();

    const processFactory = new ProcessFactory();
    await processFactory.createMany(3);

    const data = await retrieveAll("processes");

    const response = await request(app).get(`/v1/processes`).query({
      page: 2,
      pageSize: 2,
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.processes.length).toStrictEqual(1);
    expect(response.body.processes[0].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(2);
    expect(response.body.pagination.pageSize).toStrictEqual(2);
    expect(response.body.pagination.pageCount).toStrictEqual(2);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to choose fields", async () => {
    const app = await createApp();

    const processFactory = new ProcessFactory();
    await processFactory.createMany(3);

    const data = await retrieveAll("processes");

    const response = await request(app).get(`/v1/processes`).query({
      fields: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.processes.length).toStrictEqual(3);
    expect(response.body.processes[0]._id).toBeDefined();
    expect(response.body.processes[1]._id).toBeDefined();
    expect(response.body.processes[2]._id).toBeDefined();
    expect(response.body.processes[0].name).toStrictEqual(data[0].name);
    expect(response.body.processes[1].name).toStrictEqual(data[1].name);
    expect(response.body.processes[2].name).toStrictEqual(data[2].name);
    expect(response.body.processes[0].status).toBeUndefined();
    expect(response.body.processes[1].status).toBeUndefined();
    expect(response.body.processes[2].status).toBeUndefined();
    expect(response.body.processes[0].createdAt).toBeUndefined();
    expect(response.body.processes[1].createdAt).toBeUndefined();
    expect(response.body.processes[2].createdAt).toBeUndefined();

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to retrieve all processes", async () => {
    const app = await createApp();

    const processFactory = new ProcessFactory();
    await processFactory.createMany(3);

    const data = await retrieveAll("processes");

    const response = await request(app).get(`/v1/processes`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.processes.length).toStrictEqual(3);
    expect(response.body.processes[0]._id).toBeDefined();
    expect(response.body.processes[0].name).toStrictEqual(data[0].name);
    expect(response.body.processes[0].status).toStrictEqual(ProcessStatusTypes.Active);
    expect(isValid(new Date(response.body.processes[0].createdAt))).toBeTruthy();
    expect(response.body.processes[1].name).toStrictEqual(data[1].name);
    expect(response.body.processes[2].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
});
