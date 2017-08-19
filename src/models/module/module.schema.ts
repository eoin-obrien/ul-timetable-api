import { GraphQLError } from 'graphql';

export function assertValidModuleId(id: string) {
  if (!/^[A-Z]{2}\d{4}$/.test(id)) {
    throw new GraphQLError(`Module ID "${id}" is invalid.`);
  }
}

// language=GraphQL Schema
export const moduleSchema: string = `
  #
  type Module {
    _id: ID!
    name: String!
  }
`;
