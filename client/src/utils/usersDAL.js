import axios from "axios";

const getAllUsers = async () => {
  const response = await axios.get("/api/users");

  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`/api/users/${id}`);

  return response.data;
};

const addUser = async (obj) => {
  const response = await axios.post("/api/users", obj);

  return response.data;
};

const editUser = async (id, obj) => {
  const response = await axios.put(`/api/users/${id}`, obj);
  return response.data;
};

export default { getAllUsers, getUser, deleteUser, addUser, editUser };
