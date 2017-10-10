// import GraphQL types
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

// import dynastyfftools types
import { PlayerInputType, PlayerType, ECRType, ECRInputType } from './types';

// import db operations
import { getPlayer, getPlayers, createPlayer, updatePlayer, removePlayer } from './database';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    player: {
      type: PlayerType,
      args: {
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: (_, args) => getPlayer(args),
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve: () => getPlayers(),
    },
    ecr: {
      type: ECRType,
      args: {
        playerId: { type: GraphQLString },
      },
    },
  }),
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPlayer: {
      type: PlayerType,
      args: {
        player: { type: PlayerInputType },
      },
      resolve: (_, { player }) => createPlayer(player),
    },
    createECR: {
      type: ECRType,
      args: {
        ecr: { type: ECRInputType },
      },
    },
    updatePlayer: {
      type: PlayerType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        old_id: { type: GraphQLString },
        mfl_id: { type: GraphQLString },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        team: { type: GraphQLString },
        draft_year: { type: GraphQLString },
        twitter_username: { type: GraphQLString },
        stats_id: { type: GraphQLString },
        weight: { type: GraphQLString },
        college: { type: GraphQLString },
        draft_round: { type: GraphQLString },
        height: { type: GraphQLString },
        rotoworld_id: { type: GraphQLString },
        nfl_id: { type: GraphQLString },
        espn_id: { type: GraphQLString },
        birthdate: { type: GraphQLInt },
        status: { type: GraphQLString },
        armchair_id: { type: GraphQLString },
        stats_global_id: { type: GraphQLString },
        kffl_id: { type: GraphQLString },
        draft_team: { type: GraphQLString },
        draft_pick: { type: GraphQLString },
        jersey: { type: GraphQLString },
        cbs_id: { type: GraphQLString },
        sportsdata_id: { type: GraphQLString },
        fp_id: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
      },
      resolve: (_, args) => updatePlayer(args),
    },
    removePlayer: {
      type: PlayerType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { _id }) => removePlayer(_id),
    },
  }),
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
