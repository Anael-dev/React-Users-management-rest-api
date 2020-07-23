let express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
var membersRouter = require("./routers/membersRoute");
var postsRouter = require("./routers/postsRoute");
var todosRouter = require("./routers/todosRoute");
const path = require("path");

let app = express();
app.use(cors());

require("./configs/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use("/api/users", membersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/todos", todosRouter);

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Server is starting at ${port}`));
