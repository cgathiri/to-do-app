const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: String,
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Todo', TodoSchema);
