import dotenv from 'dotenv';

dotenv.config();


export const Configuration  ={
    IS_DEV : process.env.NODE_ENV !== 'production',
    PORT: process.env.PORT || 4321,
    POSTGRES_CONNECTIONS_STRING: process.env["PG_CONNECTION_STRING"] || "postgres://postgres:password@localhost:5532/postgres",
    MONGODB_CONNECTION_STRING: process.env["MDB_CONNECTION_STRING "] || "mongodb://localhost:28017/azdev"

}

/*
PORT=4321

PG_CONNECTION_STRING="postgres://postgres:password@localhost:5532/postgres"
MDB_CONNECTION_STRING="mongodb://localhost:28017/azdev"
 */