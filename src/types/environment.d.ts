declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            MONGO_URI: string;
            SERVER_PORT: string;
            SERVER_HOSTNAME: string;
            WALLET_ADDRESS_ADMIN: string;
            TOKEN_SECRET: string;
            PROVIDER: string;
            BSC_RPC: string;
            POLYGON_RPC: string;
            BSC_ARC: string;
            MINTER_SERVER: string;
            ZOOP_API_KEY: string;
            ZOOP_APP_ID: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
