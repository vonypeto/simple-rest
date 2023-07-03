import dbConfig from "@config/db.config";
import mongoose, { Mongoose } from "mongoose";

import AccountModel from "@models/account/account.models";
import ProductModel from "@models/product/product.models";

mongoose.Promise = global.Promise;

const db: {
  mongoose: Mongoose;
  url: string;
  accountdb: typeof AccountModel;
  productdb: typeof ProductModel;
} = {} as any;
db.mongoose = mongoose;
db.url = dbConfig.url;
db.accountdb = AccountModel;
db.productdb = ProductModel;
export default db;
