const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const todoModel = require('./Models/todoModel')
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/Mern-todoList')
app.get('/get', (req, res) => {
    todoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.post('/add', (req, res) => {
    const newItem = req.body.newItem
    todoModel.create({
        newItem: newItem
    })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.put('/update/:id', (req, res) => {
    const { id } = req.params
    todoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    todoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.listen(5000, () => {
    console.log('Project working on port 5000');
})
