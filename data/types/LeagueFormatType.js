// import GraphQL types
import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'LeagueFormatType',
  values: {
    NORMAL: { value: 0 },
    SUPER: { value: 1 },
  },
});
