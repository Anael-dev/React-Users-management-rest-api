const axios = require("axios");

exports.getAll = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data.map((x) => {
    return {
      title: x.title,
      body: x.body,
      users: [{ id: x.userId }],
    };
  });
};
