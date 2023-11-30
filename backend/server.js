const express = require("express");
const colors = require("colors");
const path = require("path");
var cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
//const { restart } = require('nodemon')
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(
  cors({
    origin: "https://tasklist-mern-frontend.vercel.app",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/", (req, res) => {
  res.send("hello");
});

// Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// }
// if (process.env.NODE_ENV === "dev") {
//   app.use(express.static(path.join(__dirname, "../frontend/public")));
//   //   console.log(path.resolve(__dirname, "../", "frontend", "index.html"));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "../", "frontend", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
