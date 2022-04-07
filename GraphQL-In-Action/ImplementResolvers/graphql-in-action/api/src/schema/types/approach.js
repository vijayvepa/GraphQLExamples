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

export const ApproachV2 = new GraphQLObjectType({
    name: 'ApproachV2',
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
            resolve: (source, args, {loaders}) => {
                return loaders.users.load(source.userId)
            }
        }
    }
});

export default Approach;