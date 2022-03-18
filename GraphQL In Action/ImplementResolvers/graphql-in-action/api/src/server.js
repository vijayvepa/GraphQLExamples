import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {Configuration} from "./configuration";
import {graphqlHTTP} from "express-graphql";
import {schema} from "./schema";
import {schemaFromString, rootValue} from "./schema/from-string";

async function main() {

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

    server.use('/', graphqlHTTP({schema, graphiql: true}));

    server.listen(Configuration.PORT, () => {
        console.log(`Server URL: http://localhost:${Configuration.PORT}`);
    })

}

main();