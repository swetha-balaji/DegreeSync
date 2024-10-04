const Student = require("../models/Student");

// Constants used as lower and upper bounds for generating a student ID
const MIN = 8080000000;
const MAX = 8089999999;

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

    let newStudent = await Student.create({
        major: 'Computer Science',
        classification: classification,
        studentid: studentId,
        student_name: firstName + ' ' + lastName,
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

    let student = await Student.findOne({ studentid: req.session.userId }).exec();

    res.render('dashboard', { isAuthorized: true, student: student });
}

exports.logout = (req, res)=>{
    if (!req.session.userId) {
        res.redirect('/');
    }
    req.session.destroy();
    res.clearCookie('sid');
    res.redirect('/')
}