import * as server from 'apollo-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './api/schema';
import { resolvers } from './api/resolvers';
import { getContext } from './api/util';

const graphqlSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const graphqlHandler = server.graphqlLambda(() => ({
  schema: graphqlSchema,
  context: getContext(),
}));

export const graphiqlHandler = server.graphiqlLambda({
  endpointURL: '/Prod/graphql',
});
