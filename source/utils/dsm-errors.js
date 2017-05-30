class DsmError extends Error {}

class GeneralServerError extends DsmError {
    constructor(message = 'An unspecified error occured.') {
        super(message);
    }

    get statusCode() {
        return 500;
    }
}

class NotFoundError extends DsmError {
    get statusCode() {
        return 404;
    }
}

module.exports = {
    DsmError,
    GeneralServerError,
    NotFoundError
};