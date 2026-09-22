const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    eyeBrow: {
      type: String,
      required: true,
    },
    aboutTagLine: {
      type: String,
      required: true,
    },
    aboutBio: {
      type: [String],
      required: true,
    },
    contactHeading: {
      type: String,
      required: true,
    },
    contactSubheading: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
      required: true,
    },
    linkedinUrl: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    timelineMilestones: [
      {
        year: String,
        subTitle: String,
        title: String,
        specialization: String,
        description: String,
        keyLearing: [String],
      },
    ],
  },
  { timestamps: true },
);
module.exports = mongoose.model("Profile", profileSchema);
