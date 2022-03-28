import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {Configuration} from "./configuration";
import {graphqlHTTP} from "express-graphql";
import {schema} from "./schema";
import {schemaFromString, rootValue} from "./schema/from-string";
import {schemaFromFile, rootValueForFile} from "./schema/from-file";
import PostgresClient from "./db/PostgresClient";

async function main() {

    const postgresClient = await PostgresClient();

    const server = express();

    server.use(cors());
    server.use(morgan('dev'));
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());
    server.use('/:fav.ico', (req, res) => res.sendStatus(204));

    server.use('/hello', (req, res) => {
        res.send('Hello world!');
    });

    server.use('/from-string', graphqlHTTP({schema: schemaFromString, rootValue, graphiql: true}));
    server.use('/from-file', graphqlHTTP({schema: await schemaFromFile(), rootValue: rootValueForFile, graphiql: true}));

    server.use('/', graphqlHTTP({schema, graphiql: true, context: {postgresPool: postgresClient.connectionPool}}));

    server.listen(Configuration.PORT, () => {
        console.log(`Server URL: http://localhost:${Configuration.PORT}`);
    })

}

main();