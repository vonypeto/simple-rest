import { Schema, Document, Model, model, Types } from "mongoose";

export interface IProductDb extends Document {
  name: string;
  price: string;
  password: string;
  user: Types.ObjectId | string;
}

const productDbSchema: Schema<IProductDb> = new Schema(
  {
    name: { type: String },
    price: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "accounts" },
  },
  { timestamps: true }
);

productDbSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.price_id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const ProductDb: Model<IProductDb> = model<IProductDb>(
  "products",
  productDbSchema
);

export default ProductDb;
