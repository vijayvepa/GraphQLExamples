import {GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import User from "./user";
import Approach from "./approach";
import {Utils} from "../../utils";

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
        },
        approachList: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Approach))),
            resolve: (source, args, {postgresApi}) => {
                return postgresApi.approachList(source.id);
            }
        }
    }
});

export const TaskV2 = new GraphQLObjectType({
    name: 'TaskV2',
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
            resolve: prefixedObject =>
                Utils.extractPrefixedColumns({prefixedObject, prefix: 'author'}),
        }
    }
});


export default Task;