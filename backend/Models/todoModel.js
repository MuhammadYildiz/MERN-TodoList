const mongoose = require('mongoose');
const todosSchema = new mongoose.Schema({
    newItem: String,
    done: {
        type: Boolean,
        default: false
    }
})
const todoModel = mongoose.model('todos', todosSchema);
module.exports = todoModel;