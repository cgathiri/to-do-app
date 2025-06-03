const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');

// Register page route
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Handle registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/login');
});

// Login route
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Handle login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        req.flash('success', 'Login successful!');
        
        // Redirect to To-Do page after login
        return res.redirect('/todo');
    } else {
        req.flash('error', 'Invalid credentials!');
        return res.redirect('/login');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
