const Student = require("../models/Student");
const Course = require("../models/Course");
const StudentCourse = require('../models/StudentCourse');

// Constants used as lower and upper bounds for generating a student ID
const MIN = 8080000000;
const MAX = 8089999999;

function generateCredits(classification) {
    switch (classification) {
        case 'Freshman':
            return Math.floor(Math.random() * 15) + 15; // 15 to 29 credits
        case 'Sophomore':
            return Math.floor(Math.random() * 30) + 30; // 30 to 59 credits
        case 'Junior':
            return Math.floor(Math.random() * 30) + 60; // 60 to 89 credits
        case 'Senior':
            return Math.floor(Math.random() * 31) + 90; // 90 to 120 credits
        default:
            return 0;
    }
}

exports.getHomePage = (req, res) => {
    if (req.session.userId) {
        res.redirect('/dashboard');
        return;
    }
    res.render('index', { err: false, isAuthorized: false, student: undefined });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        let student = await Student.findOne({ email: email, password: password }).exec();
        if (student) {
            req.session.userId = student.studentid;
            res.redirect('/dashboard');
            return;
        } else {
            res.render('index', { err: true, isAuthorized: false, student: undefined });
            return;
        }
    } else {
        res.redirect('/');
    }
};

exports.getSignupPage = (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.render('register', { isAuthorized: false, student: undefined, err: false });
};

exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password, classification, concentration } = req.body;

    let student = await Student.findOne({ email: email }).exec();
    if (student) {
        res.render('register', { isAuthorized: false, student: undefined, err: true });
        return;
    }

    // Split concentration to determine BS or BA
    let [conc, degree] = concentration.split('-');

    let studentId = Math.floor(Math.random() * (MAX - MIN) + MIN);
    let credits = generateCredits(classification);
    let newStudent = await Student.create({
        major: 'Computer Science',
        classification: classification,
        studentid: studentId,
        student_name: firstName + ' ' + lastName,
        credits: credits,
        advisor: "Random Advisor",
        concentration: conc,
        degree_type: degree,
        email: email,
        password: password,
        gpa: (Math.random() + 3.00).toFixed(2)
    });

    await newStudent.save();

    // Generate courses for the new student based on their classification
    await generateStudentCourses(newStudent.classification, newStudent._id);

    res.redirect('/');
};

// Function to generate a random grade (A, B, C)
function generateRandomGrade() {
    const grades = ['A', 'B', 'C'];
    return grades[Math.floor(Math.random() * grades.length)];
}

async function generateStudentCourses(classification, studentId) {
    let student = await Student.findById(studentId); // Find student by ID
    let selectedCourses = [];
    let numberOfCourses = 0;

    // Determine the number of courses based on the classification
    switch (classification) {
        case 'Freshman':
            numberOfCourses = Math.floor(Math.random() * 5) + 1; // 1 to 5 courses (Intro level)
            selectedCourses = await Course.find({ level: 'Intro' }).limit(numberOfCourses);
            break;
        case 'Sophomore':
            numberOfCourses = Math.floor(Math.random() * 6) + 5; // 5 to 10 courses (Intro, Intermediate level)
            selectedCourses = await Course.find({ level: { $in: ['Intro', 'Intermediate'] } }).limit(numberOfCourses);
            break;
        case 'Junior':
            numberOfCourses = Math.floor(Math.random() * 6) + 10; // 10 to 15 courses (Intro, Intermediate, Advanced level)
            selectedCourses = await Course.find({ level: { $in: ['Intro', 'Intermediate', 'Advanced'] } }).limit(numberOfCourses);
            break;
        case 'Senior':
            numberOfCourses = Math.floor(Math.random() * 10) + 15; // 15 to 24 courses (Intro, Intermediate, Advanced level)
            selectedCourses = await Course.find({ level: { $in: ['Intro', 'Intermediate', 'Advanced'] } }).limit(numberOfCourses);
            break;
        default:
            console.log("Unknown classification: ", classification);
    }

    // Generate StudentCourse entries for each selected course
    for (let course of selectedCourses) {
        // Determine if the course is completed
        let completed = false;
        if (classification === 'Freshman') {
            completed = Math.random() > 0.8; // Freshman have a lower chance of completing courses
        } else if (classification === 'Sophomore') {
            completed = Math.random() > 0.6; // Sophomores have a moderate chance
        } else if (classification === 'Junior') {
            completed = Math.random() > 0.4; // Juniors have a higher chance
        } else if (classification === 'Senior') {
            completed = Math.random() > 0.2; // Seniors have a very high chance
        }

        // If completed, assign a random grade
        let gradeObtained = '--';
        if (completed) {
            gradeObtained = generateRandomGrade();
        }

        // Create a new StudentCourse document with the specific course ID
        const studentCourse = new StudentCourse({
            student: studentId,
            course: course._id, // Assign the actual course ID from the selected courses
            inProgress: !completed, // If not completed, course is still in progress
            completed: completed, // Set the completion status
            grade_obtained: gradeObtained // Assign grade if completed
        });

        await studentCourse.save(); // Save the course for the student
    }
}

exports.getDashboardPage = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }

    try {
        let student = await Student.findOne({ studentid: req.session.userId }).exec();

        // Retrieve all student courses with the course details populated
        let studentCourses = await StudentCourse.find({ student: student._id })
            .populate('course') // Populate the course details
            .exec();

        // Map student courses to include course details, completed status, and grade
        studentCourses = studentCourses.map((studentCourse) => {
            return {
                course: studentCourse.course,
                completed: studentCourse.completed,
                grade: studentCourse.grade_obtained
            };
        });

        let majorCourses = await Course.find({ is_core: true }).exec();

        // Check if program is passed as query parameter, otherwise use student's concentration
        const program = req.query.program || student.concentration;
        let concentrationCourses = await Course.find({ concentration: program }).exec();

        const whatif = req.query.whatif === 'true';

        res.render('dashboard', {
            isAuthorized: true,
            student: student,
            majorCourses: majorCourses,
            concentrationCourses: concentrationCourses,
            studentCourses: studentCourses, // Pass studentCourses to the view
            whatif: whatif
        });
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Server Error");
    }
};


exports.logout = (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    req.session.destroy();
    res.clearCookie('sid');
    res.redirect('/');
};
