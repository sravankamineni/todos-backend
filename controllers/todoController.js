const Todo = require('../models/todo');
const asyncHandler = require('express-async-handler')


//@desc Create todo
//route POST /api/todos
exports.createTodo = asyncHandler(async (req, res) => {
    const { title } = req.body;
    if(!title) {
        res.status(400)
        throw new Error("Invalid title")
    }
    const newTodo = await Todo.create({ user_id: req.user.id, title})
    res.status(201).json({newTodo})
});


//@desc Get All todos of logged user
//route GET /api/todos
exports.getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ user_id: req.user.id})
    res.status(200).json({todos})

});


//@desc update todo
//route PUT /api/todos/:id
exports.updateTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id)
    if (!todo) {
        res.status(404)
        throw new Error("Todo Not Found")
    }
    if (todo.user_id.toString() != req.user.id) {
        res.status(403)
        throw new Error("User not permitted to update")
    }

    const updateTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ updateTodo })
});


//@desc Get todo by id
//route DELETE /api/todos/:id

exports.deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id)
    if(!todo){
        res.status(404)
        throw new Error("Todo Not Found")
    }

    if (todo.user_id.toString() != req.user.id) {
        res.status(403)
        throw new Error("User not permitted to delete")
    }
    const deleteTodo = await Todo.findByIdAndDelete(id)
    res.status(200).json({deleteTodo})

});

