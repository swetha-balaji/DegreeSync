const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    major: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    studentid: {
        type: Number,
        required: true,
        unique: true
    },
    student_name: {
        type: String,
        required: true
    },
    concentration: {
        type: String,
        required: true
    },
    advisor: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);