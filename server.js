let express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const favicon = require("express-favicon");

var membersRouter = require("./routers/membersRoute");
var postsRouter = require("./routers/postsRoute");
var todosRouter = require("./routers/todosRoute");

let app = express();
const port = process.env.PORT || 8000;
app.use(favicon(__dirname + "client/build/favicon.ico"));
// the __dirname is the current directory from where the script is running
app.use(cors());

require("./configs/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use("/api/users", membersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/todos", todosRouter);

app.listen(port, console.log(`Server is starting at ${port}`));
