import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat
} from 'graphql';

import {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  removePlayer,
} from './database';

const playerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
	_id: {
	  type: GraphQLString,
	  resolve: ({ _id }) => _id,
	},
    old_id: {
        type: GraphQLString,
        resolve: ({ old_id }) => old_id,
    },
    mfl_id: {
        type: GraphQLString,
        resolve: ({ mfl_id }) => mfl_id,
    },
    name: {
        type: GraphQLString,
        resolve: ({ name }) => name,
    },
    position: {
        type: GraphQLString,
        resolve: ({ position }) => position,
    },
    team: {
        type: GraphQLString,
        resolve: ({ team }) => team,
    },
    draft_year: {
        type: GraphQLString,
        resolve: ({ draft_year }) => draft_year,
    },
    twitter_username: {
        type: GraphQLString,
        resolve: ({ twitter_username }) => twitter_username,
    },
    stats_id: {
        type: GraphQLString,
        resolve: ({ stats_id }) => stats_id,
    },
    weight: {
        type: GraphQLString,
        resolve: ({ weight }) => weight,
    },
    college: {
        type: GraphQLString,
        resolve: ({ college }) => college,
    },
    draft_round: {
        type: GraphQLString,
        resolve: ({ draft_round }) => draft_round,
    },
    height: {
        type: GraphQLString,
        resolve: ({ height }) => height,
    },
    rotoworld_id: {
        type: GraphQLString,
        resolve: ({ rotoworld_id }) => rotoworld_id,
    },
    nfl_id: {
        type: GraphQLString,
        resolve: ({ nfl_id }) => nfl_id,
    },
    espn_id: {
        type: GraphQLString,
        resolve: ({ espn_id }) => espn_id,
    },
    birthdate: {
        type: GraphQLInt,
        resolve: ({ birthdate }) => birthdate,
    },
    status: {
        type: GraphQLString,
        resolve: ({ status }) => status,
    },
    armchair_id: {
        type: GraphQLString,
        resolve: ({ armchair_id }) => armchair_id,
    },
    stats_global_id: {
        type: GraphQLString,
        resolve: ({ stats_global_id }) => stats_global_id,
    },
    kffl_id: {
        type: GraphQLString,
        resolve: ({ kffl_id }) => kffl_id,
    },
    draft_team: {
        type: GraphQLString,
        resolve: ({ draft_team }) => draft_team,
    },
    draft_pick: {
        type: GraphQLString,
        resolve: ({ draft_pick }) => draft_pick,
    },
    jersey: {
        type: GraphQLString,
        resolve: ({ jersey }) => jersey,
    },
    cbs_id: {
        type: GraphQLString,
        resolve: ({ cbs_id }) => cbs_id,
    },
    sportsdata_id: {
        type: GraphQLString,
        resolve: ({ sportsdata_id }) => sportsdata_id,
    },
    fp_id: {
        type: GraphQLString,
        resolve: ({ fp_id }) => fp_id,
    },
    createdAt: {
        type: GraphQLInt,
        resolve: ({ createdAt }) => createdAt,
    },
    updatedAt: {
        type: GraphQLInt,
        resolve: ({ updatedAt }) => updatedAt,
    },
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
	player: {
	  type: playerType,
	  args: {
		_id: { type: new GraphQLNonNull(GraphQLString) },
	  },
	  resolve: (_, { _id }) => getPlayer(_id),
	},
	players: {
	  type: new GraphQLList(playerType),
	  resolve: () => getPlayers(),
	},
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
	createPlayer: {
	  type: playerType,
	  args: {
		player: { type: new GraphQLNonNull(GraphQLString) },
	  },
	  resolve: (_, { player }) => createPlayer(player),
	},
	updatePlayer: {
	  type: playerType,
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
	  resolve: (_, { _id, player }) =>
				  updateTodo(_id, player),
	},
	removeTodo: {
	  type: playerType,
	  args: {
		_id: { type: new GraphQLNonNull(GraphQLString) },
	  },
	  resolve: (_, { _id }) => removeTodo(_id),
	}
  })
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});