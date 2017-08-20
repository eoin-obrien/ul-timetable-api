export interface ILesson {
  startTime: string;
  endTime: string;
  module: string;
  group?: string;
  type: string;
  rooms: string[];
  weeks: string[];
}
