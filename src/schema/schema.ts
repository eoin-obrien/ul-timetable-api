import * as _ from 'lodash';
import * as GraphQLDate from 'graphql-date';
import { makeExecutableSchema } from 'graphql-tools';

import moduleSchema from '../models/module/module.schema';
import roomSchema from '../models/room/room.schema';
import timetableSchema from '../models/timetable/timetable.schema';
import weekSchema from '../models/week/week.schema';

import { resolvers as moduleResolvers } from '../models/module/module.resolver';
import { resolvers as weekResolvers } from '../models/week/week.resolver';

// language=GraphQL Schema
const rootQuery = `
  type RootQuery {
    timetable(_id: ID!): Timetable
    module(_id: ID!): Module
    room(_id: ID!): Room
    week(_id: ID!): Week
    weeks: [Week]
  }
`;

// language=GraphQL Schema
const schemaDefinition = `
  scalar Date
  
  schema {
    query: RootQuery
  }
`;

const resolveFunctions = {
  Date: GraphQLDate,
};

_.merge(resolveFunctions, moduleResolvers, weekResolvers);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
  typeDefs: [
    schemaDefinition,
    rootQuery,
    moduleSchema,
    roomSchema,
    timetableSchema,
    weekSchema,
  ],
  resolvers: resolveFunctions,
});
