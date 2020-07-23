import axios from "axios";

const getAllTodos = async () => {
  const response = await axios.get("http://localhost:8000/api/todos");

  return response.data.map((x) => {
    return { ...x, id: x._id };
  });
};

const getTodo = async (id) => {
  const response = await axios.get(`http://localhost:8000/api/todos/${id}`);

  return response.data;
};

const deleteTodo = async (id) => {
  const response = await axios.delete(`http://localhost:8000/api/todos/${id}`);

  return response.data;
};

const addTodo = async (obj) => {
  const response = await axios.post("http://localhost:8000/api/todos", obj);

  return response.data;
};

const editTodo = async (id, obj) => {
  const response = await axios.put(
    `http://localhost:8000/api/todos/${id}`,
    obj
  );
  return response.data;
};

export default { getAllTodos, getTodo, deleteTodo, addTodo, editTodo };
