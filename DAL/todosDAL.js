const axios = require("axios");

exports.getAll = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data
    .map((x) => {
      return {
        userId: x.userId,
        title: x.title,
        completed: x.completed,
      };
    })
    .slice(0,20);
};
