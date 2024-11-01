const Courseee = require('./courseee');

class DegreeRequirement {
    constructor() {
        this.requiredCourses = [];
        this.electiveCourses = [];
        this.minElectiveHours = 0;
    }

    addRequiredCourse(course) {
        this.requiredCourses.push(course);
    }

    addElectiveCourse(course) {
        this.electiveCourses.push(course);
    }

    setMinElectiveHours(hours) {
        this.minElectiveHours = hours;
    }

    checkRequirements(studentCourses) {
        let missingRequiredCourses = this.requiredCourses.filter(
            requiredCourse => !studentCourses.some(
                studentCourse => studentCourse.name === requiredCourse.name
            )
        );

        let totalElectiveHours = studentCourses.reduce(
            (hours, course) => {
                if (this.electiveCourses.some(elective => elective.name === course.name)) {
                    return hours + course.creditHours;
                }
                return hours;
            }, 0
        );

        return {
            missingRequiredCourses,
            electiveHoursMet: totalElectiveHours >= this.minElectiveHours
        };
    }
}

module.exports = DegreeRequirement;
