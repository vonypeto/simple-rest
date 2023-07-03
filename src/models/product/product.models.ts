import { Schema, Document, Model, model } from "mongoose";

export interface IProductDb extends Document {
  name: string;
  price: string;
  password: string;
}

const productDbSchema: Schema<IProductDb> = new Schema(
  {
    name: { type: String },
    price: { type: String },
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
