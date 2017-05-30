const express = require('express');

const { executeAction } = require('../utils/action-handler');
const activityController = require('./activity.controller');

const activityRouter = express.Router();

activityRouter
    .get('/', executeAction(activityController.getAll))
    .get('/:activityId', executeAction(activityController.getById))
    .post('/', executeAction(activityController.createActivity))
    .put('/:activityId', executeAction(activityController.updateActivityById))
    .delete('/:activityId', executeAction(activityController.deleteActivity));

module.exports = activityRouter;