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

const getAvatarImg = async (id, name) => {
  try {
    // const response = await axios.get("https://tinyfac.es/api/users");
    // return response.data[id].avatars[0].url;
    const response = await axios.get("https://randomuser.me/api/?inc=picture");
    return response.data.results[0].picture.medium;
  } catch (err) {
    console.log(err);
    const userImg = `https://ui-avatars.com/api/?background=4591af&color=fff&name=${
      name.split(" ")[0]
    }+${name.split(" ")[1]}`;
    return userImg;
  }
};
export default {
  getAllUsers,
  getUser,
  deleteUser,
  addUser,
  editUser,
  getAvatarImg,
};
