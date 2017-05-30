const bluebird = require('bluebird');

const { NotFoundError } = require('../utils/dsm-errors');

const executeAction = action => {
    return (req, res, next) => {
        const activateAction = () => action(req.params, req.body, req.query);
        
        bluebird
            .resolve(activateAction())
            .then(actionResult => {
                req.actionResult = {value: actionResult};

                next();
            })
            .catch(err => next(err));
    };
};

const handleActionResult = (req, res, next) => {
    if (!req.actionResult) {
        return next(new NotFoundError('Action not found.'));
    }

    res.json(req.actionResult.value);
}

module.exports = {
    executeAction,
    handleActionResult
};