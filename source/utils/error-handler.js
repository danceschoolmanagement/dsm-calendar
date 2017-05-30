const logger = require('./logger');
const { DsmError, GeneralServerError } = require('./dsm-errors');

const errorHandler = (err, req, res, next) => {
    if (!(err instanceof DsmError)) {
        err = new GeneralServerError();
    }
    
    logger.error('An error occured', err);

    if (res.headersSent) {
        return next(err);
    }

    res
        .status(err.statusCode || 500)
        .send(err.message);
};

module.exports = errorHandler;