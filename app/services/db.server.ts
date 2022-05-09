import mongoose, { Mongoose } from "mongoose";

let db: Mongoose;
declare global {
  var __db: Mongoose | undefined;
}

const MONGODB_URL = process.env.MONGODB_URL as string;

(async () => {
  if (process.env.NODE_ENV === "production") {
    db = await mongoose.connect(MONGODB_URL);
  } else {
    if (!global.__db) {
      global.__db = await mongoose.connect(MONGODB_URL);
    }
    db = global.__db;
  }
})();

export { db };
