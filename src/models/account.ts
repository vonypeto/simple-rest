import { Schema, Document, Model, model } from 'mongoose';

export interface IAccountDb extends Document {
  name: string;
  email: string;
  password: string;
}

const accountDbSchema: Schema<IAccountDb> = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

accountDbSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.account_id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const AccountDb: Model<IAccountDb> = model<IAccountDb>(
  'accounts',
  accountDbSchema
);

export default AccountDb;
