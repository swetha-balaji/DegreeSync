const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const User = require('./models/User');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');

const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mongodB:eqJtPNhRbA4asm8n@cluster0.skb4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.use(morgan('tiny'))
app.use(expressLayouts);
app.set('layout', './layout/layout')
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index')
});

app.use('/', authRoutes);

app.listen(3000, () => {
    console.log("Server is started on port 3000...");
});
