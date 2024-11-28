const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    level: {   
        type: String,
        enum: ['Intro', 'Intermediate', 'Advanced'],
        required: true
    },
    prereq: {
        type: String,
    },
    terms: {
        type: String,
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
    is_core : {
        type: Boolean,
    },
    is_capstone: {
        type: Boolean
    }
});

module.exports = mongoose.model('Course', courseSchema);