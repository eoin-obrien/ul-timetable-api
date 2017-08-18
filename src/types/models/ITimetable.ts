import { Document } from 'mongoose';
import { ILesson } from './ILesson';

export interface ITimetable extends Document {
  _id: string;
  monday: ILesson[];
  tuesday: ILesson[];
  wednesday: ILesson[];
  thursday: ILesson[];
  friday: ILesson[];
  saturday: ILesson[];
}
