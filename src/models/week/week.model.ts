import { Model, Schema, model } from 'mongoose';
import { IWeek } from '../../types/models/IWeek';

const WeekSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
});

WeekSchema.set('timestamps', true);


export const Week: Model<IWeek> = model<IWeek>('Week', WeekSchema);
