const express = require("express");
require("dotenv").config();
const connectDb = require("./config/db_connection");
const authRoutes = require("./Routes/auth/authRoutes");
const app = express();

connectDb();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.listen(process.env.PORT || 5555, () => {
  console.log(`Server is running ....`);
});
