import axios from "axios";

const getAllUsers = async () => {
  const response = await axios.get("http://localhost:8000/api/users");

  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`http://localhost:8000/api/users/${id}`);

  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`http://localhost:8000/api/users/${id}`);

  return response.data;
};

const addUser = async (obj) => {
  const response = await axios.post("http://localhost:8000/api/users", obj);

  return response.data;
};

const editUser = async (id, obj) => {
  const response = await axios.put(
    `http://localhost:8000/api/users/${id}`,
    obj
  );
  return response.data;
};

export default { getAllUsers, getUser, deleteUser, addUser, editUser };
