const express = require("express");
require("dotenv").config();
const connectDb = require("./config/db_connection");
const authRoutes = require("./Routes/auth/authRoutes");
const adminMessageRoutes = require("./Routes/admin/messageRoutes");
const userMessageRoutes = require("./Routes/user/messageRoutes");
const errorHandler = require("./Middlewares/errorMiddleware");

const app = express();

connectDb();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminMessageRoutes);
app.use("/api/v1/user", userMessageRoutes);
app.use(errorHandler);

app.listen(process.env.PORT || 5555, () => {
  console.log(`Server is running ....`);
});
