const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentCourseSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    grade_obtained: {
        type: String,
        required: true
    },
    future_grade: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('StudentCourse', studentCourseSchema);