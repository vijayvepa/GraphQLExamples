import {buildSchema} from "graphql";

export const schemaFromString = buildSchema(`
    type Query {
        currentTime: String!
    }
`);

export const rootValue = {
    currentTime: () => {
        const isoString = new Date().toISOString();
        return isoString.slice(11, 19);
    }
}