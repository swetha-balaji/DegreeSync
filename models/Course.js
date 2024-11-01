const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    prereq: {
        type: String,
        required: true
    },
    crn: {
        type: Number,
        required: true
    },
    classno: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true
    },
    concentration: {
        type: [String],
        required: true
    },
});

module.exports = mongoose.model('Course', courseSchema);