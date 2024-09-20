const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
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
    grade_obtained: {
        type: String,
        required: true
    },
    future_grade: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);