const express = require('express');
const { json, urlencoded } = require('body-parser');

const { handleActionResult } = require('./utils/action-handler');

const activityRouter = require('./activity/activity.router');

const dsmCalendarApp = express();

dsmCalendarApp.use(json());
dsmCalendarApp.use(urlencoded({extended: true}));

dsmCalendarApp.use('/activity', activityRouter);

dsmCalendarApp.use(handleActionResult);

module.exports = dsmCalendarApp;