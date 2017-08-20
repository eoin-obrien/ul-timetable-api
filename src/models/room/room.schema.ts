import { GraphQLError } from 'graphql';

export const roomCodePattern = /^(S|KB|CS|GL|F|ER|LC|L|SR|P|HS|A|B|C|D|E|AD|IW|GEMS)([BGMO0123])([0-9]+[A-Z]?)$/;

export function assertValidRoomId(id: string) {
  if (!roomCodePattern.test(id)) {
    throw new GraphQLError(`Room ID "${id}" is invalid.`);
  }
}

// language=GraphQL Schema
export const roomSchema: string = `
  # A type that describes a room.
  type Room {
    # The room number.
    _id: ID!
    # The name of the building in which the room is located.
    building: String!
    # The code of the building in which the room is located.
    buildingCode: String!
    # The floor on which the room is located.
    floor: String!
    # The numeric part of the room number.
    number: String!
  }
`;
