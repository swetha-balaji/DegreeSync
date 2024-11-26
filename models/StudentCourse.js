const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentCourseSchema = new Schema({
    completed: {
        type: Boolean,
        required: true,
        default: false // Indicates that by default, the course is not yet completed
    },
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
        type: String,  // Can be A, B, C, D, F, or null if not completed
        required: false // grade is optional until the course is completed
    }
});

module.exports = mongoose.model('StudentCourse', studentCourseSchema);
