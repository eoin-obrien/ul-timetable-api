import { GraphQLError } from 'graphql';

export function assertValidWeekId(id: string) {
  if (!/^([1-9]|1[0-4]?)$/.test(id)) {
    throw new GraphQLError(`Week ID "${id}" is invalid.`);
  }
}

// language=GraphQL Schema
export const weekSchema: string = `
  type Week {
    _id: ID!
    name: String!
    date: Date!
  }
`;
