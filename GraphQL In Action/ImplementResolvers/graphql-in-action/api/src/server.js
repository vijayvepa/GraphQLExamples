import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {Configuration} from "./configuration";

async function main(){

    const server = express();

    server.use(cors());
    server.use(morgan('dev'));
    server.use(bodyParser.urlencoded({extended:false}));
    server.use(bodyParser.json());
    server.use('/:fav.ico', (req,res) => res.sendStatus(204));

    server.use('/', (req,res)=> {res.send('Hello world!');});

    server.listen(Configuration.PORT, () => {
        console.log(`Server URL: http://localhost:${Configuration.PORT}`);
    })

}

main();