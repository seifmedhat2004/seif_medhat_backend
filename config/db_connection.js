const Mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await Mongoose.connect(process.env.MONGO_CONNECTION, {});
    console.log("Database connected successfully....");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};
module.exports = connectDB;
