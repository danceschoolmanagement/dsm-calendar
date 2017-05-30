const activityModel = require('./activity.model');

class ActivityController {
    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.createActivity = this.createActivity.bind(this);
        this.updateActivityById = this.updateActivityById.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
    }
    getAll() {
        return activityModel
            .find()
            .notDeleted()
            .exec();
    }
    getById({activityId}) {
        return activityModel
            .findById(activityId)
            .notDeleted()
            .exec();
    }
    createActivity(params, activityData) {
        let newActivity = new activityModel(activityData);

        return newActivity
            .save();
    }
    updateActivityById({activityId}, activityData) {
        return activityModel
            .findByIdAndUpdate(activityId, activityData, {new: true})
            .exec();
    }
    deleteActivity({activityId}) {
        return this
            .updateActivityById({activityId}, {isDeleted: true})
            .then(doc => ({success: true}));
    }
}

module.exports = new ActivityController();