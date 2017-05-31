const mongoose = require('mongoose');
const config = require('config');

const logger = require('./logger');

mongoose.Promise = require('bluebird');

let dsmDbConnection = mongoose.createConnection(config.get('connectionString'));

dsmDbConnection.on('error', err => logger.error(err));

process
    .on('SIGINT', dsmDbConnection.close)
    .on('SIGTERM', dsmDbConnection.close);

module.exports = dsmDbConnection;