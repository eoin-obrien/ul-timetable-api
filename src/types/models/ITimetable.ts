import { Document } from 'mongoose';
import { ILesson } from './ILesson';
import { TimestampedDocument } from './TimestampedDocument';

export interface ITimetable extends Document, TimestampedDocument {
  _id: string;
  monday: ILesson[];
  tuesday: ILesson[];
  wednesday: ILesson[];
  thursday: ILesson[];
  friday: ILesson[];
  saturday: ILesson[];
}
