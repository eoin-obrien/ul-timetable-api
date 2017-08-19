import { GraphQLError } from 'graphql';

export const roomCodePattern = /^(S|KB|CS|GL|F|ER|LC|L|SR|P|HS|A|B|C|D|E|AD|IW|GEMS)([BGMO0123])([0-9]+[A-Z]?)$/;

export function assertValidRoomId(id: string) {
  if (!roomCodePattern.test(id)) {
    throw new GraphQLError(`Room ID "${id}" is invalid.`);
  }
}

// language=GraphQL Schema
export const roomSchema: string = `
  type Room {
    _id: ID!
    building: String!
    buildingCode: String!
    floor: String!
    number: String!
  }
`;
