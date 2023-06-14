import { Schema, Document, Model, model } from "mongoose";

export interface ITestDB extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  age: string;
}

const testDbSchema: Schema<ITestDB> = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    name: { type: String },
    age: { type: String },
  },
  { timestamps: true }
);

testDbSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.household_id = _id;
  return object;
});

const TestDb: Model<ITestDB> = model<ITestDB>("testdbs", testDbSchema);

export default TestDb;
