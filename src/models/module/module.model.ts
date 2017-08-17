import { Document, Model, Schema, model } from 'mongoose';

export type ModuleType = Document & {
  _id: string,
  name: string,
};

const ModuleSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
});

ModuleSchema.set('timestamps', true);

// Valid module IDs consist of two letters followed by four digits
ModuleSchema.path('_id').validate((_id : string) => {
  return /^[A-Z]{2}[0-9]{4}$/.test(_id);
});


export const Module: Model<ModuleType> = model<ModuleType>('Module', ModuleSchema);
