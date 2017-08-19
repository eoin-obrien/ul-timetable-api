import { Document } from 'mongoose';

export interface IModule extends Document {
  _id: string;
  name: string;
}
