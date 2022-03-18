import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull} from "graphql";
import {NumbersInRange} from "./types/numbers-in-range"


let Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        // currentTime: String!
        currentTime: {
            type: GraphQLString,
            resolve: getCurrentTime
        },

        // sumNumbersInRange(begin: Int!, end: Int!) : Int!

        sumNumbersInRange: {
            type: new GraphQLNonNull(GraphQLInt),
            args: {
                begin: {type: new GraphQLNonNull(GraphQLInt)},
                end: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: getSumNumbersInRange
        },

        //type NumbersInRange { sum:Int!  count: Int! }
        //numbersInRange(begin: Int!, end:Int!): NumbersInRange!

        numbersInRange: {
            type: new GraphQLNonNull(NumbersInRange),
            args: {
                begin: {type: new GraphQLNonNull(GraphQLInt)},
                end: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: getNumbersInRange
        }
    }
});


function getCurrentTime() {
    const isoString = new Date().toISOString();
    return isoString.slice(11, 19);
}

function getSumNumbersInRange(source, {begin, end}) {
    console.log(`Source: ${source}, begin: ${begin}, end: ${end}`);

    let sum = 0;
    for (let i = begin; i <= end; i++) {
        sum += i;
    }
    return sum;
}

function getNumbersInRange(source, {begin, end}) {
    console.log(`Source: ${source}, begin: ${begin}, end: ${end}`);

    if(end < begin){
        throw Error(`Invalid range because ${end} < ${begin}`);
    }

    let sum = getSumNumbersInRange(source, {begin, end});

    let count = 0;
    for (let i = begin; i <= end; i++) {
        count++;
    }
    return {sum, count, average: sum/count};
}


export const schema = new GraphQLSchema({
    query: Query
});

