import { Document } from 'mongoose';
import { TimestampedDocument } from './TimestampedDocument';

export interface IWeek extends Document, TimestampedDocument {
  _id: string;
  name: string;
}
