import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        username: {type: GraphQLString},
        name: {
            type: GraphQLString,
            resolve: ({firstName, lastName}) => [firstName, lastName].filter(Boolean).join(' ')
        }
    }
});

export default User;