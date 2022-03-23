import pg from 'pg';

import { Configuration } from '../configuration';

export default async function PostgresClient() {
    const postgresPool = new pg.Pool({
        connectionString: Configuration.POSTGRES_CONNECTIONS_STRING,
    });

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
        pgPool: postgresPool,
        pgClose: async () => postgresPool.end(),
    };
}
