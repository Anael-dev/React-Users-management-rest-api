import axios from "axios";

const getAllPosts = async () => {
  const response = await axios.get("/api/posts");
  return response.data.map((x) => {
    return { ...x, id: x._id };
  });
};

const getPost = async (id) => {
  const response = await axios.get(`/api/posts/${id}`);
  return response.data;
};

const deletePost = async (id) => {
  const response = await axios.delete(`/api/posts/${id}`);
  return response.data;
};

const addPost = async (obj) => {
  const response = await axios.post("/api/posts", obj);
  return response.data;
};

const editPost = async (id, obj) => {
  const response = await axios.put(
    `/api/posts/${id}`,
    obj
  );
  return response.data;
};

export default { getAllPosts, getPost, deletePost, addPost, editPost };
