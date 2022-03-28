import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    printSchema,
    GraphQLList
} from "graphql";
import {NumbersInRange} from "./types/numbers-in-range"
import Task from  "./types/task"

let Query = new GraphQLObjectType({
    name: 'Query', fields: {
        // currentTime: String!
        currentTime: {
            type: GraphQLString, resolve: getCurrentTimeAsync
        },

        // sumNumbersInRange(begin: Int!, end: Int!) : Int!

        sumNumbersInRange: {
            type: new GraphQLNonNull(GraphQLInt), args: {
                begin: {type: new GraphQLNonNull(GraphQLInt)}, end: {type: new GraphQLNonNull(GraphQLInt)}
            }, resolve: getSumNumbersInRange
        },

        //type NumbersInRange { sum:Int!  count: Int! }
        //numbersInRange(begin: Int!, end:Int!): NumbersInRange!

        numbersInRange: {
            type: new GraphQLNonNull(NumbersInRange), args: {
                begin: {type: new GraphQLNonNull(GraphQLInt)}, end: {type: new GraphQLNonNull(GraphQLInt)}
            }, resolve: getNumbersInRange
        },

        taskMainList: {
            type: new GraphQLList(new GraphQLNonNull(Task)),
            resolve: async (source, args, {postgresPool}) => {
                const postgresResp = await postgresPool.query(`
                    SELECT * FROM azdev.tasks WHERE is_private = FALSE
                    ORDER BY created_at DESC LIMIT 100
                `);
                return postgresResp.rows;
            }
        }
    }
});

function getCurrentTimeAsync() {
    return new Promise(resolve =>
        setTimeout(() => {
            const isoString = new Date().toISOString();
            resolve(isoString.slice(11, 19));
        }, 5000)
    );
}

function getCurrentTime2() {


    setTimeout(() => {
        const isoString = new Date().toISOString();
        return isoString.slice(11, 19);
    }, 5000);


}


function getCurrentTime() {
    const sleepToDate = new Date(new Date().getTime() + 5000);
    while (sleepToDate > new Date()) {
        // sleep
    }
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

    if (end < begin) {
        throw Error(`Invalid range because ${end} < ${begin}`);
    }

    let sum = getSumNumbersInRange(source, {begin, end});

    let count = 0;
    for (let i = begin; i <= end; i++) {
        count++;
    }
    return {sum, count, average: sum / count};
}

export const schema = new GraphQLSchema({
    query: Query
});

console.log(printSchema(schema));

//generate typescript from graphql ->
// https://www.leighhalliday.com/generating-types-apollo#:~:text=Generating%20TypeScript%20Types%20from%20GraphQL%20Schema%20in%20Apollo,Component.%20...%207%20Gotchas.%20...%208%20Conclusion.%20