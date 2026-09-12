const mongoose = require("mongoose");
const projectCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  slug: {
    type: [String],
    required: true,
    unique: true,
    lowercase: true,
  },

  icon: {
    type: String,
    required: true,
  },

  accentColor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ProjectCategory", projectCategorySchema);
