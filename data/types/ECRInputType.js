// import GraphQL types
import { GraphQLString, GraphQLFloat, GraphQLInputObjectType } from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

import LeagueFormatType from './LeagueFormatType';

const ECRInputType = new GraphQLInputObjectType({
  name: 'ECR',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: ({ _id }) => _id,
    },
    playerId: {
      type: GraphQLString,
      resolve: ({ playerId }) => playerId,
    },
    date: {
      type: GraphQLDateTime,
      resolve: ({ date }) => date,
    },
    leagueType: {
      type: LeagueFormatType,
      resolve: ({ leagueType }) => leagueType,
    },
    ecr: {
      type: GraphQLFloat,
      resolve: ({ ecr }) => ecr,
    },
    aav: {
      type: GraphQLFloat,
      resolve: ({ aav }) => aav,
    },
    low: {
      type: GraphQLFloat,
      resolve: ({ low }) => low,
    },
    high: {
      type: GraphQLFloat,
      resolve: ({ high }) => high,
    },
    stdev: {
      type: GraphQLFloat,
      resolve: ({ stdev }) => stdev,
    },
    value: {
      type: GraphQLFloat,
      resolve: ({ value }) => value,
    },
  }),
});

export default ECRInputType;
