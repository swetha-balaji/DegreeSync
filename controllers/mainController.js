const Student = require("../models/Student");
const Course = require("../models/Course");
const StudentCourse = require('../models/StudentCourse');

// Constants used as lower and upper bounds for generating a student ID
const MIN = 8080000000;
const MAX = 8089999999;

function generateCredits(classification) {
    switch (classification) {
        case 'Freshman':
            return Math.floor(Math.random() * 15) + 15; // 0 to 29 credits
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

exports.getHomePage = (req, res) =>{

    if (req.session.userId) {
        res.redirect('/dashboard');
        return;
    }

    res.render('index', { err: false, isAuthorized: false, student: undefined })
}

exports.login = async(req, res)=>{

    const { email, password } = req.body;

    if (email && password) {
        let student = await Student.findOne({ email: email, password: password}).exec();
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
}

exports.getSignupPage = (req, res)=>{
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }

    res.render('register', { isAuthorized: false, student: undefined, err: false });
}

exports.register = async(req, res, next)=>{
    const { firstName, lastName, email, password, classification, concentration } = req.body;
    
    let student = await Student.findOne({email: email}).exec()

    if (student) {
        res.render('register', { isAuthorized: false, student: undefined, err: true });
        return;
    }

    // Split concentration to determine BS or BA 
    let [conc, degree] = concentration.split('-')

    let studentId = Math.floor((Math.random() * (MAX - MIN) + MIN));
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

    await newStudent.save()
    
    generateStudentCourses(newStudent.classification);

    res.redirect('/');
}

async function generateStudentCourses(classification) {

    switch (classification) {
        case 'Freshman':
            break;
        case 'Sophomore':
            break;
        case 'Junior':
            break;
        case 'Senior':
            break;
    }

    // Student Courses have been generated

}

exports.getDashboardPage = async(req, res)=>{

    if (!req.session.userId) {
        return res.redirect('/');
    }

    try {
        let student = await Student.findOne({ studentid: req.session.userId }).exec();

        let program = req.query.program || null;
        const whatif = req.query.whatif === 'true';

        let majorCourses = await Course.find({ is_core: true }).exec();

        let concentrationCourses;
        if (program) {
            concentrationCourses = await Course.find({ concentration: program.split('-')[0] }).exec();
        } else {
            concentrationCourses = await Course.find({ concentration: student.concentration }).exec();
        }

        res.render('dashboard', {
            isAuthorized: true,
            student: student,
            majorCourses: majorCourses,
            concentrationCourses: concentrationCourses,
            whatif: whatif,
            program: program
        });

    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Server Error");
    }
};

exports.logout = (req, res)=>{
    if (!req.session.userId) {
        return res.redirect('/');
    }
    req.session.destroy();
    res.clearCookie('sid');
    res.redirect('/')
}