import {GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import User from "./user";

const Task = new GraphQLObjectType({
    name: 'Task',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        tags: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString)))
        },
        approachCount: {type: new GraphQLNonNull(GraphQLInt)},
        createdAt: {type: new GraphQLNonNull(GraphQLString)},
        author: {
            type: User,
            resolve: async (source, args, {postgresApi}) => {
                return postgresApi.userInfo(source.userId)
            }
        }
    }
});

export default Task;