interface RoomType {
  _id: string;
  building: string;
  buildingCode: string;
  floor: string;
  number: string;
}

interface IRoomArgs {
  _id: string;
}

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

function getRoom(_id: string): RoomType {
  const buildingCode = findBuildingCode(_id);
  const room: RoomType = {
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
    room(obj: Object, args: IRoomArgs) {
      return getRoom(args._id);
    },
  },
};
