const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

app.listen(process.env.PORT||5555,()=>{
    console.log(`Server is running on port ${process.env.PORT||5555}`);
})
