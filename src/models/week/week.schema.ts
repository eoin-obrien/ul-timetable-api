import { GraphQLError } from 'graphql';

export function assertValidWeekId(id: string) {
  if (!/^([1-9]|1[0-4]?)$/.test(id)) {
    throw new GraphQLError(`Week ID "${id}" is invalid.`);
  }
}

// language=GraphQL Schema
export const weekSchema: string = `
  # A type describing a week of the current semester.
  type Week {
    # The week number displayed on the timetable.
    _id: ID!
    # The teaching week name.
    name: String!
    # The ISO8601 datetime on which the week commences.
    date: Date!
  }
`;
