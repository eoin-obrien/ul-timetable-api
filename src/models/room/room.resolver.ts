import { IDataLoaders } from '../../dataloaders';
import { IRoom } from '../../types/models/IRoom';
import { ILesson } from '../../types/models/ILesson';
import { IRoomQueryArgs } from '../../types/query-args/IRoomQueryArgs';
import { assertValidRoomId, roomCodePattern } from './room.schema';

const buildings: { [key: string]: string } = {
  S: 'Schuman Building',
  KB: 'Kemmy Business School',
  CS: 'Computer Science Building',
  GL: 'Glucksman Library',
  F: 'Foundation Building',
  ER: 'Engineering Research Building',
  LC: 'Languages Building',
  L: 'Lonsdale Building',
  SR: 'Schrödinger Building',
  P: 'PESS Building',
  HS: 'Health Sciences Building',
  A: 'Main Building Block A',
  B: 'Main Building Block B',
  C: 'Main Building Block C',
  D: 'Main Building Block D',
  E: 'Main Building Block E',
  AD: 'Analog Devices Building',
  IW: 'Irish World Academy Building',
  GEMS: 'Medical School',
};

export function getRoom(_id: string): IRoom {
  assertValidRoomId(_id);
  const codeParts: string[] = _id.match(roomCodePattern);
  return {
    _id,
    buildingCode: codeParts[1],
    building: buildings[codeParts[1]],
    floor: codeParts[2],
    number: codeParts[3],
  };
}

export const resolvers = {
  RootQuery: {
    room(obj: Object, args: IRoomQueryArgs, { dataloaders }: { dataloaders: IDataLoaders }) {
      return dataloaders.roomLoader.load(args._id);
    },
  },
  Lesson: {
    rooms(lesson: ILesson, args: Object, { dataloaders }: { dataloaders: IDataLoaders }) {
      return dataloaders.roomLoader.loadMany(lesson.rooms);
    },
  },
};
