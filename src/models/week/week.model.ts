import { Model, Schema, model } from 'mongoose';
import { IWeek } from '../../types/models/IWeek';

const bestBefore = 86400000;

const WeekSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
});

WeekSchema.set('timestamps', true);

WeekSchema.methods.isStale = function () {
  const age = new Date().getTime() - this.updatedAt.getTime();
  return age > bestBefore;
};

export const Week: Model<IWeek> = model<IWeek>('Week', WeekSchema);
