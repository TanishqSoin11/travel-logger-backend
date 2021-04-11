const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const middlewares = require("./middlewares");
const logs = require("./api/logs");

// App config
const app = express();
mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB"),
);

const port = process.env.PORT || 1337;

// Middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.use("/api/logs", logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Listener
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
