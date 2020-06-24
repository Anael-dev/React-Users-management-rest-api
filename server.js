let express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
var membersRouter = require("./routers/membersRoute");
var postsRouter = require("./routers/postsRoute");
var todosRouter = require("./routers/todosRoute");

let app = express();
app.use(cors());

require("./configs/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", membersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/todos", todosRouter);

app.listen(8000);
