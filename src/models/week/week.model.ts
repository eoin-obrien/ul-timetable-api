import { Document, Model, Schema, model } from 'mongoose';

export type WeekType = Document & {
  _id: string,
  name: string,
};

const WeekSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
});

WeekSchema.set('timestamps', true);


export const Week: Model<WeekType> = model<WeekType>('Week', WeekSchema);
