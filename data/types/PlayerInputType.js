// import GraphQL types
import { GraphQLString, GraphQLInt, GraphQLInputObjectType } from 'graphql';

const PlayerInputType = new GraphQLInputObjectType({
  name: 'PlayerInput',
  description: 'Input player payload',
  fields: () => ({
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
  }),
});

export default PlayerInputType;
