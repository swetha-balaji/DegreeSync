const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const morgan = require('morgan');
const session = require('express-session');
const routes = require('./routes/routes');
const app = express();
const mongoose = require('mongoose');
const Student = require('./models/Student');

//mongoose.connect("mongodb+srv://mongodB:eqJtPNhRbA4asm8n@cluster0.skb4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "my-super-secret-key",
    cookie: {
        maxAge: 1000 * 60 * 60, // One hour
        sameSite: true,
        secure: false // Only for https
    } 
}));
app.use(morgan('tiny'));
app.use(expressLayouts);
app.set('layout', './layout/layout')
app.set('view engine', 'ejs');

app.use('/', routes);

// Error route to handle any requests that don't match any defined routes (404 Error)
app.use(async(req, res, next) => {

    let isAuthorized = false;
    let student;

    if (req.session.userId) {
        isAuthorized = true;
        student = await Student.findOne({ studentid: req.session.userId }).exec()
    }

    res.status(404);
    res.render('error', { isAuthorized, student });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000...\n");
});
