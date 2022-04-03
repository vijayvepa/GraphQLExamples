import mdb from 'mongodb';

import { Configuration } from '../configuration';

export default async function MongoClient() {
    const client = new mdb.MongoClient(Configuration.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        const mongodb = client.db();

        // Test the connection
        const collections = await mongodb.collections();
        console.log(
            'Connected to MongoDB | Collections count:',
            collections.length
        );

        return {
            mdb: mongodb,
            mdbClose: () => client.close(),
        };
    } catch (err) {
        console.error('Error in MongoDB Client', err);
        process.exit(1);
    }
}
