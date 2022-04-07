import {GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import User from "./user";

const Approach = new GraphQLObjectType({
    name: 'Approach',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        voteCount: {type: new GraphQLNonNull(GraphQLInt)},
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: ({createdAt}) => createdAt.toISOString(),
        },
        author: {
            type: new GraphQLNonNull(User),
            resolve: (source, args, {postgresApi}) => {
                return postgresApi.userInfo(source.userId)
            }
        }
    }
});

export default Approach;