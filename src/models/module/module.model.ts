import { Model, Schema, model } from 'mongoose';
import { IModule } from '../../types/models/IModule';

const bestBefore = 86400000;

const ModuleSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  exists: { type: Boolean, required: true },
});

ModuleSchema.set('timestamps', true);

ModuleSchema.methods.isStale = function () {
  const age = new Date().getTime() - this.updatedAt.getTime();
  return age > bestBefore;
};

export const Module: Model<IModule> = model<IModule>('Module', ModuleSchema);
