const mongoose = require('mongoose');

const dsmDbConnection = require('../utils/dsm-db-connection');

let activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: String,
    description: String,
    isDeleted: {
        type: Boolean,
        select: false
    }
}, {
    toJSON: {
        versionKey: false
    }
});

activitySchema.query.notDeleted = function () {
    return this.where('isDeleted').ne(true);
};

module.exports = dsmDbConnection.model('Activity', activitySchema);