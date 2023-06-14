import dbConfig from "@config/db.config";

import mongoose, { Mongoose } from "mongoose";
mongoose.Promise = global.Promise;

const db: {
  mongoose: Mongoose;
  url: string;
  //   households: typeof import("./household/household.model");
  //   household_members: typeof import("./housemembers/housemembers.model");
} = {} as any;

db.mongoose = mongoose;
db.url = dbConfig.url;

// db.households = require("./household/household.model")(mongoose);
// db.household_members = require("./housemembers/housemembers.model")(mongoose);

export default db;
