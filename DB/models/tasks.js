const { Schema, model } = require('mongoose');
const { boolean } = require('webidl-conversions');

const tasksSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    complete: {
        type: String,
        required: true
    },
    created: {
        type: String,
        default: new Date().toDateString()
    }
})

module.exports = model('Tasks', tasksSchema)
