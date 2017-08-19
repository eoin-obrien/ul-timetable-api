import { Model, Schema, model } from 'mongoose';
import { IModule } from '../../types/models/IModule';

const ModuleSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
});

ModuleSchema.set('timestamps', true);

// Valid module IDs consist of two letters followed by four digits
ModuleSchema.path('_id').validate((_id : string) => {
  return /^[A-Z]{2}[0-9]{4}$/.test(_id);
});


export const Module: Model<IModule> = model<IModule>('Module', ModuleSchema);
