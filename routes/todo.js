const router = require("express").Router();
const Todo = require("../models/todo");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

//List all Todo
router.get("/", (req, res) => {
  Todo.find().exec((err, todos) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({ data: todos });
  });
});

//Create a Todo
router.post("/create", (req, res) => {
  const todo = Todo({
    title: req.body.title,
    content: req.body.content,
  });
  todo.save((err, todo) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({ data: todo });
  });
});

//Edit a Todo
router.put("/:id", (req, res) => {
  Todo.findById(req.params.id)
  .exec((err,todo)=>{
    if (err) {
      return res.json({ error: err });
    }
    todo.title = req.body.title ?? todo.title;
    todo.content = req.body.content ?? todo.content;
    todo.completed = req.body.completed ?? todo.completed;
    todo.save((err,todo) => {
      if(err){
      return res.json({ error: err });

      }
      return res.json({ data: todo });

    })
  })
});

//Delete a Todo
router.delete("/:id", (req, res) => {
  Todo.remove({
    _id: req.params.id,
  }).exec((err, result) => {
    if (err) {
      return res.json({ error: err });
    }
    if (result.deletedCount == 0) {
      return res.json({ data: "No Todo Found with given id" });
    }
    return res.json({ data: "Deleted Successfully" });
  });
});

module.exports = router;
