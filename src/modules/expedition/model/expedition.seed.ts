import { ExpeditionsStatusTypes } from "./expedition.entity.js";

export const expeditionsSeeds = [
  {
    name: "Example Name 1",
    firstName: "Example",
    lastName: "Name 1",
    status: ExpeditionsStatusTypes.Active,
    createdAt: new Date(),
  },
  {
    name: "Example Name 2",
    firstName: "Example",
    lastName: "Name 2",
    status: ExpeditionsStatusTypes.Active,
    createdAt: new Date(),
  },
  {
    name: "Example Name 3",
    firstName: "Example",
    lastName: "Name 3",
    status: ExpeditionsStatusTypes.Active,
    createdAt: new Date(),
  },
];
