const express = require('express');
const router = express.Router();
const Todo = require('../models/ToDo');

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
};

// GET To-Do list
router.get('/', isAuthenticated, async (req, res) => {
    const todos = await Todo.find({ userId: req.session.user._id });
    res.render('todo', { user: req.session.user, todos });
});

// POST Add new task
router.post('/', isAuthenticated, async (req, res) => {
    const newTask = new Todo({
        userId: req.session.user._id,
        task: req.body.task,
        completed: false
    });
    await newTask.save();
    res.redirect('/todo');
});

// POST Toggle complete
router.post('/:id/toggle', isAuthenticated, async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todo && todo.userId.equals(req.session.user._id)) {
        todo.completed = !todo.completed;
        await todo.save();
    }
    res.redirect('/todo');
});

// POST Delete task
router.post('/:id/delete', isAuthenticated, async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todo && todo.userId.equals(req.session.user._id)) {
        await Todo.findByIdAndDelete(req.params.id);
    }
    res.redirect('/todo');
});

module.exports = router;
