const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = require('bluebird');

let dsmDbConnection = mongoose.createConnection(config.get('connectionString'));

process
    .on('SIGINT', dsmDbConnection.close)
    .on('SIGTERM', dsmDbConnection.close);

module.exports = dsmDbConnection;