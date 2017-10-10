// import GraphQL types
import { GraphQLString, GraphQLFloat, GraphQLInputObjectType } from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

import LeagueFormatType from './LeagueFormatType';

const ECRInputType = new GraphQLInputObjectType({
  name: 'ECRInput',
  fields: () => ({
    id: { type: GraphQLString },
    playerId: { type: GraphQLString },
    date: { type: GraphQLDateTime },
    leagueType: { type: LeagueFormatType },
    ecr: { type: GraphQLFloat },
    aav: { type: GraphQLFloat },
    low: { type: GraphQLFloat },
    high: { type: GraphQLFloat },
    stdev: { type: GraphQLFloat },
    value: { type: GraphQLFloat },
  }),
});

export default ECRInputType;
