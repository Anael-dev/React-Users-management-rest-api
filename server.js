let express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config()
var membersRouter = require("./routers/membersRoute");
var projectsRouter = require("./routers/projectsRoute");
var todosRouter = require("./routers/todosRoute");

let app = express();
app.use(cors());

require("./configs/database");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", membersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/todos", todosRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static("client/build"));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, console.log(`Server is starting at ${port}`));
