const mongoose = require("mongoose");

const certificateModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  organization: {
    type: String,
    required: true,
  },
  issueDate: {
    type: String,
    required: true,
  },
  verificationUrl: {
    type: String,
  },
  image: {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Certification", certificateModel);
