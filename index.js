const express = require('express');
const expressLayouts = require("express-ejs-layouts");


const app = express();

app.use(expressLayouts);
app.set('layout', './layout/layout')
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log("Server is started on port 3000...");
});