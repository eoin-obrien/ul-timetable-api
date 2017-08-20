import { Document } from 'mongoose';
import { TimestampedDocument } from './TimestampedDocument';

export interface IModule extends Document, TimestampedDocument {
  _id: string;
  name: string;
}
