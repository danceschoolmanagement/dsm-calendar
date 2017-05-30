const express = require('express');
const { json, urlencoded } = require('body-parser');
const winstonRequestLogger = require('winston-request-logger');

const errorHandler = require('./utils/error-handler');
const logger = require('./utils/logger');
const { handleActionResult } = require('./utils/action-handler');

const activityRouter = require('./activity/activity.router');

const dsmCalendarApp = express();

dsmCalendarApp.use(json());
dsmCalendarApp.use(urlencoded({extended: true}));
dsmCalendarApp.use(winstonRequestLogger.create(logger));

dsmCalendarApp.use('/activity', activityRouter);

dsmCalendarApp.use(handleActionResult);

dsmCalendarApp.use(errorHandler);

module.exports = dsmCalendarApp;