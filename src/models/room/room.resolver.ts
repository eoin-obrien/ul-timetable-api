import { DataLoaders } from '../../dataloaders';
import { IRoom } from '../../types/models/IRoom';
import { ILesson } from '../../types/models/ILesson';
import { IRoomQueryArgs } from '../../types/query-args/IRoomQueryArgs';

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
const floorPattern = /^B|G|M|O|0|1|2|3$/;
const roomPattern = /^[0-9]+[A-Z]?$/;

function findBuildingCode(roomId: string) {
  return Object.keys(buildings).reduce((longest, current) => {
    if (roomId.startsWith(current) && current.length > longest.length) {
      return current;
    }
    return longest;
  }, '');
}

export function getRoom(_id: string): IRoom {
  const buildingCode = findBuildingCode(_id);
  const room: IRoom = {
    _id,
    buildingCode,
    building: buildings[buildingCode],
    floor: _id.substring(buildingCode.length, buildingCode.length + 1),
    number: _id.substring(buildingCode.length + 1),
  };
  if (!room.buildingCode || !floorPattern.test(room.floor) || !roomPattern.test(room.number)) {
    return null;
  }
  return room;
}

export const resolvers = {
  RootQuery: {
    room(obj: Object, args: IRoomQueryArgs, { dataloaders }: { dataloaders: DataLoaders }) {
      return dataloaders.roomLoader.load(args._id);
    },
  },
  Lesson: {
    rooms(lesson: ILesson, args: Object, { dataloaders }: { dataloaders: DataLoaders }) {
      return dataloaders.roomLoader.loadMany(lesson.rooms);
    },
  },
};
