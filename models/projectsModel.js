const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },

  projectCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectCategory",
  },
  
  slug: {
    type: [String],
    required: true,
    unique: true,
  },

  shortDescription: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  mainImage: {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },

  gallery: [
    {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
  ],

  technologies: [
    {
      type: String,
    },
  ],

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  githubUrl: {
    type: String,
  },

  liveDemoUrl: {
    type: String,
  },

  projectStatus: {
    type: String,
    enum: ["draft", "published", "archived"],
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Project", projectSchema);
