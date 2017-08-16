import { Document, Model, Schema, model } from 'mongoose';

export type RoomType = Document & {
  _id: string,
  name: string,
};

const RoomSchema = new Schema({
  _id: { type: String, required: true },
  building: { type: String, required: true },
  floor: { type: String, required: true },
  number: { type: String, required: true },
});

RoomSchema.set('timestamps', true);


export const Room: Model<RoomType> = model<RoomType>('Room', RoomSchema);
