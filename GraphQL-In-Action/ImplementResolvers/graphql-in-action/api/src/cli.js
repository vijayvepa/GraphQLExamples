import {graphql} from "graphql";
import {rootValue, schema} from "./schema";

const executeGraphQLRequest = async request => {
    const resp = await graphql({schema: schema, source: request, rootValue: rootValue});
    console.log(resp.data);
}

console.log(process.argv[2]);
executeGraphQLRequest(process.argv[2]);

//node -r esm api/src/schema/cli.js "{ currentTime }"