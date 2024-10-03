const Student = require("../models/Student");

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

    res.render('signup', { isAuthorized: false, student: undefined });
}

exports.register = (req, res)=>{
    res.send('<h1>Posted to Signup Page</h1>');
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