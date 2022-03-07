// import mongodb from 'mongodb';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoClient = require('mongodb').MongoClient;
// const MongoClient = mongodb?.MongoClient;
const url = process.env.MONGO_URI;
const dbName = process.env.DM_COMMENTS_DB_NAME;

export async function makeDb() {
    const client = await MongoClient.connect(url);
    const db = client.db('homebyz');
    console.log(`MongoDB Connected: ${url}`);
    return db;
}
