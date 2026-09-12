const express = require("express");
require("dotenv").config();
const connectDb = require("./config/db_connection");
const app = express();

connectDb();

app.use(express.json());

app.listen(process.env.PORT || 5555, () => {
  console.log(`Server is running ....`);
});
