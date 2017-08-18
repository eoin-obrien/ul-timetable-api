import { Document } from 'mongoose';

export interface IWeek extends Document {
  _id: string;
  name: string;
}
