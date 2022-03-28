import pg from 'pg';

import { Configuration } from '../configuration';
import url from 'url'

export default async function PostgresClient() {

    console.log("connectionString: " + Configuration.POSTGRES_CONNECTIONS_STRING);

    const params = url.parse(Configuration.POSTGRES_CONNECTIONS_STRING);
    const auth = params.auth.split(':');

    const options = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: false
    };

    console.log(`options: ${options.user} ${options.password} ${options.host} ${options.port}`);


    const postgresPool = new pg.Pool(options);

    // Test the connection
    const client = await postgresPool.connect();
    const tableCountResp = await client.query(
        'select count(*) from information_schema.tables where table_schema = $1;',
        ['azdev']
    );
    client.release();

    console.log(
        'Connected to PostgreSQL | Tables count:',
        tableCountResp.rows[0].count
    );

    postgresPool.on('error', (err) => {
        console.error('Unexpected PG client error', err);
        process.exit(-1);
    });

    return {
        connectionPool: postgresPool,
        pgClose: async () => postgresPool.end(),
    };
}
