import { ObjectId } from "mongodb";
import { IDatabaseAdapter } from "./connection.js";

export class MongoDBHelper {
  private db;

  constructor(db: IDatabaseAdapter) {
    this.db = db;
  }

  /**
   * https://www.mongodb.com/docs/drivers/node/current/fundamentals/indexes/
   * https://www.mongodb.com/docs/manual/reference/collation/
   */
  public async createUnique(collection: string, property: string) {
    await this.db.createIndex(
      collection,
      { [property]: -1 },
      {
        unique: true,
        collation: {
          locale: "en",
          strength: 2,
        },
      }
    );
  }

  public async isExists(name: string) {
    const collections = (await this.db.listCollections()) as [];
    return collections.some(function (collection: { name: string }) {
      return collection.name === name;
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const replaceStringToObjectId = (val: any): any => {
  if (val == null) return null;
  if (Array.isArray(val)) {
    return val.map((item) => {
      return replaceStringToObjectId(item);
    });
  } else if (typeof val === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(val).reduce((obj: any, key) => {
      const propVal = replaceStringToObjectId(val[key]);
      obj[key] = propVal;
      return obj;
    }, {});
  } else if (typeof val === "string") {
    if (ObjectId.isValid(val) && val === new ObjectId(val).toString()) {
      return new ObjectId(val);
    }
  }

  return val;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const replaceObjectIdToString = (val: any): any => {
  if (val == null) return null;
  if (Array.isArray(val)) {
    return val.map((item) => {
      return replaceObjectIdToString(item);
    });
  } else if (typeof val === "object" && ObjectId.isValid(val)) {
    return val.toString();
  } else if (typeof val === "object" && val instanceof Date) {
    return val;
  } else if (typeof val === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(val).reduce((obj: any, key) => {
      const propVal = replaceObjectIdToString(val[key]);
      obj[key] = propVal;
      if (ObjectId.isValid(val)) {
        return val.toString();
      } else {
        const propVal = replaceObjectIdToString(val[key]);
        obj[key] = propVal;
        return obj;
      }
    }, {});
  }

  return val;
};
