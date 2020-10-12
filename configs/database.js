const mongoose = require("mongoose");
const membersBL = require("../models/membersBL");
const projectsBL = require("../models/projectsBL");
const todosBL = require("../models/todosBL");

const URI = `mongodb://heroku_h6rwhl8x:${process.env.MONGO_PASS}@cluster-shard-00-00.hduwz.mongodb.net:27017,cluster-shard-00-01.hduwz.mongodb.net:27017,cluster-shard-00-02.hduwz.mongodb.net:27017/heroku_f8kwvt04?ssl=true&replicaSet=atlas-84mli3-shard-0&authSource=admin&retryWrites=true&w=majority
`;
mongoose.connect(process.env.MONGOLAB_PINK_URI || URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once("open", async () => {
  console.log("DB connected!");

  try {
    const membersData = await membersBL.getAll();
    // const projectsData = await projectsBL.getAll();
    // const todosData = await todosBL.getAll();

    if (membersData.length === 0) {
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
