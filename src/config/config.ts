const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};

const getConfig = () => {
    const MONGO_HOST = process.env.MONGO_URI || `mongodb://localhost:27017/homebyz`;

    const MONGO = {
        host: MONGO_HOST,
        options: MONGO_OPTIONS
    };

    const SERVER_PORT = process.env.PORT || 5100;

    const SERVER = {
        port: SERVER_PORT
    };

    const config = {
        mongo: MONGO,
        server: SERVER
    };
    return config;
};
export default getConfig;
