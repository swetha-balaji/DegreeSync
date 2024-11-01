const DegreeRequirement = require('../models/degreeRequirement');
const Course = require('../models/courseee');

const degreeController = {
    checkRequirements: (req, res) => {
        const degree = new DegreeRequirement();

        // Example: Add required and elective courses (would be more dynamic in reality)
        degree.addRequiredCourse(new Course('CS 101', 3));
        degree.addRequiredCourse(new Course('CS 102', 4));
        degree.addElectiveCourse(new Course('History 101', 3));
        degree.addElectiveCourse(new Course('Art 101', 2));
        degree.setMinElectiveHours(6);

        // Example: Get student's completed courses (from request or database)
        const studentCourses = [
            new Course('CS 101', 3),
            new Course('History 101', 3),
            new Course('Art 101', 2)
        ];

        const result = degree.checkRequirements(studentCourses);
        res.json(result);  // Return result to the view (e.g., as JSON for frontend)
    }
};

module.exports = degreeController;
