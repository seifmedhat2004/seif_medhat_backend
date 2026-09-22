const mongoose = require("mongoose");

const skillsModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Data Analysis", "Back end", "Dev tools"],
    required: true,
  },
  levelDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Master"],
    required: true,
  },
});

module.exports = mongoose.model("Skills", skillsModel);
