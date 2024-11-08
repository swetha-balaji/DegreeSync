const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    major: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        enum: ['Freshman', 'Sophomore', 'Junior', 'Senior'], 
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
    degree_type: {
        type: String,
        required: true
    },
    advisor: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
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
    },
    gpa: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);