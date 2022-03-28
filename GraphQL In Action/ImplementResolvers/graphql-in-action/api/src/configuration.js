import dotenv from 'dotenv';

dotenv.config();


export const Configuration  ={
    IS_DEV : process.env.NODE_ENV !== 'production',
    PORT: process.env.PORT,
    POSTGRES_CONNECTIONS_STRING: process.env["PG_CONNECTION_STRING"],
    MONGODB_CONNECTION_STRING: process.env["MDB_CONNECTION_STRING "]

}