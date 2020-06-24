const express = require("express");
const todosBL = require("../models/todosBL");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const todos = await todosBL.getAll();
    res.json(todos);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todosBL.getById(id);
    res.json(todo);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todosBL.deleteTodo(id);
    res.json(todo);
  } catch (err) {
    res.send(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const newTodo = await todosBL.postTodo(req.body);
    res.json(newTodo);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTodo = await todosBL.editTodo(id, req.body);
    res.json(updatedTodo);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
