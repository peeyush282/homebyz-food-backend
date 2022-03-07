import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import logging from './config/logging';
import getConfig from './config/config';
import cors from 'cors';
import connectDb from './utils/connectionDb';
import { Api, Message } from './utils/constants';
// import routes from './routes';
import { errorHandler } from './middlewares/errorhandle';
import routes from './routes';
const app = express();
dotenv.config();

const config = getConfig();

app.use(cors());

process
    .on('unhandledRejection', (reason, p) => {
        logging.error('unhandledRejection', '', '', 'Server', JSON.stringify(reason));
    })
    .on('uncaughtException', (err) => {
        logging.error(err.message, '', '', 'Server', JSON.stringify(err));
    });

app.use(express.urlencoded({ extended: true }));

/** Connect to Mongo */
if (process.env.NODE_ENV !== 'test') {
    connectDb();
}

/** Log the request */
app.use((req, res, next) => {
    next();
});

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use(express.json());
/** Log the request */
app.use((req, res, next) => {
    next();
});
const whitelist = [];
if (process.env.homebyzAuthOrigin) {
    whitelist.push(process.env.homebyzAuthOrigin);
}

const corsOptionsDelegate = {
    origin: function (origin, callback) {
        if (origin && whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
/** Routes go here */

app.use('/api/food', errorHandler, routes);

/** Error handling */
app.use((req, res) => {
    Api.notFound(req, res, Message.NotFound);
});

/* Cron jobs call */

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logging.info(`Server is running :${config.server.port}`));

export default app;
