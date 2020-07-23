const mongoose = require("mongoose");

const membersBL = require("../models/membersBL");
const postsBL = require("../models/postsBL");
const todosBL = require("../models/todosBL");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/usersDB",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

db.once("open", async () => {
  console.log("DB connected!");

  try {
    const membersData = await membersBL.getAll();
    const postsData = await postsBL.getAll();
    const todosData = await todosBL.getAll();

    if (
      membersData.length === 0 &&
      postsData.length === 0 &&
      todosData.length === 0
    ) {
      const members = await membersBL.getMembers();
      await db.collection("members").insertMany(members);

      const posts = await postsBL.getPosts();
      await db.collection("posts").insertMany(posts);

      const todos = await todosBL.getTodos();
      await db.collection("todos").insertMany(todos);
    }
  } catch (e) {
    console.log(e);
  }
});
