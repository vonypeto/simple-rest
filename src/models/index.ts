import dbConfig from "@config/db.config";
import mongoose, { Mongoose } from "mongoose";
import TestDBModel from "@models/testdb/testdb.models";

mongoose.Promise = global.Promise;

const db: {
  mongoose: Mongoose;
  url: string;
  testdb: typeof TestDBModel;
} = {} as any;

db.mongoose = mongoose;
db.url = dbConfig.url;

db.testdb = TestDBModel;

export default db;
