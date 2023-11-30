const mongoose = require("mongoose");
// MONGO_URI =
//   "mongodb+srv://asifmohd1146:hAD4PqFmzyoWQ5Yg@cluster0.x1yh6ry.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
