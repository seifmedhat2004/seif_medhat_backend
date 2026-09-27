const express = require("express");
require("dotenv").config();
const connectDb = require("./config/db_connection");
const authRoutes = require("./Routes/auth/authRoutes");
const adminMessageRoutes = require("./Routes/admin/messageRoutes");
const userMessageRoutes = require("./Routes/user/messageRoutes");
const categoryRoutes = require("./Routes/admin/categoryRoutes");
const projectRoutes = require("./Routes/admin/projectRoutes");
const projectUserRoutes = require("./Routes/user/projectsRoutes");
const profileRoutres = require("./Routes/admin/profileRoutes");
const skillRouters = require("./Routes/admin/skillRoutes");
const errorHandler = require("./Middlewares/errorMiddleware");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");
const app = express();

app.use(helmet());
const allowedOrigins = [
  "http://localhost:5173",
  "https://seif-medhat.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Prevent HTTP Parameter Pollution
app.use(hpp());
// Disable Express signature
app.disable("x-powered-by");

// Limit JSON body size (protect against DoS)
app.use(express.json({ limit: "10kb" }));
// Limit URL-encoded body size (protect against DoS)
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// Compress responses (improve performance)
app.use(compression());
connectDb();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminMessageRoutes);
app.use("/api/v1/user", userMessageRoutes);
app.use("/api/v1/admin", categoryRoutes);
app.use("/api/v1/admin", profileRoutres);
app.use("/api/v1/admin", projectRoutes);
app.use("/api/v1/user", projectUserRoutes);
app.use("/api/v1/admin", skillRouters);
app.use(errorHandler);

app.listen(process.env.PORT || 5555, () => {
  console.log(`Server is running ....`);
});
