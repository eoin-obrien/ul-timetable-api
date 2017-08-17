import { Document, Model, Schema, model } from 'mongoose';

export type LessonType = {
  startTime: string;
  endTime: string;
  module: string;
  group?: string;
  type: string;
  room: string;
  weeks: string[]
};

export type TimetableType = Document & {
  _id: string;
  monday: LessonType[];
  tuesday: LessonType[];
  wednesday: LessonType[];
  thursday: LessonType[];
  friday: LessonType[];
  saturday: LessonType[];
};

const LessonSchema = new Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  module: { type: String, ref: 'Module', required: true },
  group: { type: String },
  type: { type: String, required: true },
  room: { type: String, required: true },
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


export const Timetable: Model<TimetableType> = model<TimetableType>('Timetable', TimetableSchema);
