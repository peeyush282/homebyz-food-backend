import { Api } from '../utils/constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err, _req, res, next) {
    // if(if (res.headersSent) {
    //   return next(err);
    //   })
    if (typeof err === 'string') {
        // custom application error
        return res.status(400).json({ message: err.toString() });
    }

    if ((res.headersSent && err.name === 'UnauthorizedError') || (err instanceof Error && err.message.includes('CORS'))) {
        // jwt authentication error
        return res.status(403).json({
            message: err.name === 'UnauthorizedError' ? 'Invalid Token' : err.message
        });
    }

    // default to 500 server error
    return Api.serverError(_req, res, '', err.message);
}
