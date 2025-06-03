// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const app = express(); // creating an instance of express

// Middleware setup
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use('/', authRoutes);
app.use('/todo', todoRoutes);

// Setting up the default route to redirect to the login page
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Start server
app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
