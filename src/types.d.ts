import * as DataLoader from 'dataloader';

export type DataLoaders = {
  modules: DataLoader<string, Module | null>;
  rooms: DataLoader<string, Room | null>;
  studentTimetables: DataLoader<string, StudentTimetable | null>;
  weeks: DataLoader<string, Week | null>;
};

export type RootValue = {};

export type Context = {
  dataloaders: DataLoaders;
};

export type StudentTimetableQueryArgs = {
  id: string;
};

export type ModuleQueryArgs = {
  id: string;
};

export type RoomQueryArgs = {
  id: string;
};

export type WeekQueryArgs = {
  id: string;
};

export type StudentTimetableLesson = {
  startTime: string;
  endTime: string;
  module: string;
  group?: string;
  type: string;
  rooms: string[];
  weeks: string[];
};

export type StudentTimetable = {
  id: string;
  monday: StudentTimetableLesson[];
  tuesday: StudentTimetableLesson[];
  wednesday: StudentTimetableLesson[];
  thursday: StudentTimetableLesson[];
  friday: StudentTimetableLesson[];
  saturday: StudentTimetableLesson[];
};

export type Module = {
  id: string;
  name: string;
};

export type Week = {
  id: string;
  name: string;
  date: Date;
};

export type Room = {
  id: string;
  building: string;
  buildingCode: string;
  floor: string;
  number: string;
};
