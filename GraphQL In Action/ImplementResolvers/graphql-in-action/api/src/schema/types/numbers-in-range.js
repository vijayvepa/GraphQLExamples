import {GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType} from "graphql";

export const NumbersInRange = new GraphQLObjectType({
    name: 'NumbersInRange',
    description: 'Aggregate info of range of numbers',
    fields: {
        sum: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        count: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        average: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    }
})
