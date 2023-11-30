const express = require("express");
const colors = require("colors");
const path = require("path");
var cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

corsConfig = {
  origin: "https://tasklist-mern-frontend.vercel.app",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
};

const app = express();
app.use(cors(corsConfig));
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/", (req, res) => {
  res.send("hello");
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
