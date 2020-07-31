import axios from "axios";

const getAllProjects = async () => {
  const response = await axios.get("/api/projects");
  return response.data.map((x) => {
    return { ...x, id: x._id };
  });
};

const getProject = async (id) => {
  const response = await axios.get(`/api/projects/${id}`);
  return response.data;
};

const deleteProject = async (id) => {
  const response = await axios.delete(`/api/projects/${id}`);
  return response.data;
};

const addProject = async (obj) => {
  const response = await axios.project("/api/projects", obj);
  return response.data;
};

const editProject = async (id, obj) => {
  const response = await axios.put(`/api/projects/${id}`, obj);
  return response.data;
};

const addProjectUser = async (id, obj) => {
  const response = await axios.put(`/api/projects/addUser/${id}`, obj);
  return response.data;
};

const removeProjectUser = async (id, obj) => {
  const response = await axios.put(`/api/projects/removeUser/${id}`, obj);
  return response.data;
};

export default {
  getAllProjects,
  getProject,
  deleteProject,
  addProject,
  editProject,
  addProjectUser,
  removeProjectUser,
};
