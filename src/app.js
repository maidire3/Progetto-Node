const express = require("express");

const postsRouter = require("./routes/posts.routes");
const usersRouter = require("./routes/users.routes");
const interactionsRouter = require("./routes/interactions.routes");
const { notFoundHandler, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Tongue API online" });
});

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/interactions", interactionsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
