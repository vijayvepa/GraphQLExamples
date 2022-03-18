import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull} from "graphql";


let queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        currentTime: {
            type: GraphQLString,
            resolve: getCurrentTime
        }
    }
});

export const schema = new GraphQLSchema({
    query: queryType
});


function getCurrentTime() {
    const isoString = new Date().toISOString();
    return isoString.slice(11, 19);
}