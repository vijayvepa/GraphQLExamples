import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {Configuration} from "./configuration";
import {graphqlHTTP} from "express-graphql";
import {schema} from "./schema";
import {rootValue, schemaFromString} from "./schema/from-string";
import {rootValueForFile, schemaFromFile} from "./schema/from-file";
import PostgresClient from "./db/PostgresClient";
import PostgresApiWrapper from "./db/PostgresApiWrapper";

async function main() {

    const postgresClient = await PostgresClient();
    const postgresApiWrapper = await PostgresApiWrapper();

    const server = express();

    const customFormatErrorFn = error => {
        const errorReport = {
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path
        };
        console.log('GraphQL Error', errorReport);

        return Configuration.IS_DEV ? errorReport : {message: 'Oops! Something went wrong! :('}
    };

    server.use(cors());
    server.use(morgan('dev'));
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());
    server.use('/:fav.ico', (req, res) => res.sendStatus(204));

    server.use('/hello', (req, res) => {
        res.send('Hello world!');
    });

    server.use('/from-string', graphqlHTTP({schema: schemaFromString, rootValue, graphiql: true}));
    server.use('/from-file', graphqlHTTP({
        schema: await schemaFromFile(),
        rootValue: rootValueForFile,
        graphiql: true
    }));

    server.use('/', graphqlHTTP({
        schema, graphiql: true,
        context: {postgresPool: postgresClient.connectionPool, postgresApi: postgresApiWrapper},
        customFormatErrorFn: customFormatErrorFn
    }));



    server.listen(Configuration.PORT, () => {
        console.log(`Server URL: http://localhost:${Configuration.PORT}`);
    })

}

main();