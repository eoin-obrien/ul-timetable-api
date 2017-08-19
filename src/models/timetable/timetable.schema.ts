import { GraphQLError } from 'graphql';

export function assertValidStudentId(id: string) {
  if (!/^[0-9]{7,8}$/.test(id)) {
    throw new GraphQLError(`Student ID "${id}" is invalid.`);
  }
}

// language=GraphQL Schema
export const timetableSchema: string = `
  type Lesson {
    startTime: String!
    endTime: String!
    module: Module!
    group: String
    type: String!
    rooms: [Room!]!
    weeks: [Week!]!
  }

  type Timetable {
    _id: ID!
    monday: [Lesson!]!
    tuesday: [Lesson!]!
    wednesday: [Lesson!]!
    thursday: [Lesson!]!
    friday: [Lesson!]!
    saturday: [Lesson!]!
  }
`;
