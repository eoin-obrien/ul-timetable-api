import { Model, Schema, model } from 'mongoose';
import { ITimetable } from '../../types/models/ITimetable';

const LessonSchema = new Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  module: { type: String, ref: 'Module', required: true },
  group: String,
  type: { type: String, required: true },
  rooms: [String],
  weeks: [{ type: String, ref: 'Week' }],
}, { _id: false });

const TimetableSchema = new Schema({
  _id: { type: String, required: true },
  monday: [LessonSchema],
  tuesday: [LessonSchema],
  wednesday: [LessonSchema],
  thursday: [LessonSchema],
  friday: [LessonSchema],
  saturday: [LessonSchema],
});

TimetableSchema.set('timestamps', true);


export const Timetable: Model<ITimetable> = model<ITimetable>('Timetable', TimetableSchema);
