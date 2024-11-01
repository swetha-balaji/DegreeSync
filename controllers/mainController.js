const Student = require("../models/Student");
const Course = require("../models/Course");
const StudentCourse = require("../models/StudentCourse");

// Constants used as lower and upper bounds for generating a student ID
const MIN = 8080000000;
const MAX = 8089999999;

function generateCredits(classification) {
    switch (classification) {
        case 'Freshman':
            return Math.floor(Math.random() * 30); // 0 to 29 credits
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
        res.redirect('/dashboard');
        return;
    }

    res.render('register', { isAuthorized: false, student: undefined, err: false });
}

exports.register = async(req, res)=>{
    const { firstName, lastName, email, password, classification, concentration } = req.body;
    
    // Check if email already exists
    let student = await Student.findOne({email: email}).exec()

    // if student exists render an error message
    if (student) {
        res.render('register', { isAuthorized: false, student: undefined, err: true });
        return;
    }

    // Split concentration to determine BS or BA 
    let [conc, degree] = concentration.split('-')

    // Generate random 808 number to be student id, 
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
    });

    newStudent.save();
    res.redirect('/')
}

exports.getDashboardPage = async(req, res)=>{
    if (!req.session.userId) {
        res.redirect('/');
        return;
    }

    try {
        let student = await Student.findOne({ studentid: req.session.userId }).exec();
        let concentrationCourses = await Course.find({ concentration: student.concentration }).exec();
        let enrolledCourses = await StudentCourse.find({ student: student._id }).populate('course').exec();

        const enrolledCoursesMap = new Map();
        enrolledCourses.forEach((sc) => {
            enrolledCoursesMap.set(sc.course._id.toString(), sc);
        });

        const coursesWithGrades = concentrationCourses.map((course) => {
            const enrolledData = enrolledCoursesMap.get(course._id.toString());
            return {
                ...course._doc,
                grade_obtained: enrolledData ? enrolledData.grade_obtained : "-",
                future_grade: enrolledData ? enrolledData.future_grade : ""
            };
        });

        const whatif = req.query.whatif === 'true';

        res.render('dashboard', {
            isAuthorized: true,
            student: student,
            courses: coursesWithGrades,
            whatif: whatif 
        });

    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Server Error");
    }
};

exports.getCourses = async (req, res) => {
    if (!req.session.userId) {
        res.redirect('/');
        return;
    }

    let student = await Student.findOne({ studentid: req.session.userId }).exec();
    let courses = await Course.find({ concentration: student.concentration }).exec();
    res.render('dashboard', { isAuthorized: true, student: student, courses: courses });
};

exports.logout = (req, res)=>{
    if (!req.session.userId) {
        res.redirect('/');
    }
    req.session.destroy();
    res.clearCookie('sid');
    res.redirect('/')
}