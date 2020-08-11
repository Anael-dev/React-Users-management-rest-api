const mongoose = require("mongoose");

const membersBL = require("../models/membersBL");
const projectsBL = require("../models/projectsBL");
const todosBL = require("../models/todosBL");

mongoose.connect(
  process.env.MONGOLAB_PINK_URI || "mongodb://localhost:27017/usersDB",

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
    // const projectsData = await projectsBL.getAll();
    // const todosData = await todosBL.getAll();

    if (
      membersData.length === 0
    ) {
      const members = await membersBL.getMembers();
      await db.collection("members").insertMany(members);

      // const projects = await projectsBL.getProjects();
      // await db.collection("projects").insertMany(projects);

      // const todos = await todosBL.getTodos();
      // await db.collection("todos").insertMany(todos);
    }
  } catch (e) {
    console.log(e);
  }
});
