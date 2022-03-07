import mongoose from 'mongoose';
import logging from '../config/logging';
import getConfig from '../config/config';
const config = getConfig();

function connectDb() {
    const { MONGO_URI } = process.env;

    mongoose
        .connect(MONGO_URI, config.mongo.options)
        .then(async () => {
            logging.info('Mongodb connected');
        })
        .catch((error: any) => {
            logging.error(error.message, error);
        });
}

export default connectDb;
