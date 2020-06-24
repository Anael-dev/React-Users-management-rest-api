const todosDAL = require("../DAL/todosDAL");
const Todo = require("./todoModel");

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    Todo.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.getTodos = async () => {
  const response = await todosDAL.getAll();
  return response;
};

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    Todo.findById(id, function (err, todo) {
      if (err) {
        reject(err);
      } else {
        resolve(todo);
      }
    });
  });
};

exports.deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    Todo.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("deleted");
      }
    });
  });
};

exports.postTodo = (reqBody) => {
  const newTodo = new Todo(reqBody);
  return new Promise((resolve, reject) => {
    newTodo.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.editTodo = (id, reqBody) => {
  return new Promise((resolve, reject) => {
    Todo.findByIdAndUpdate(id, reqBody, function (err, todo) {
      if (err) {
        reject(err);
      } else {
        resolve(todo);
      }
    });
  });
};
