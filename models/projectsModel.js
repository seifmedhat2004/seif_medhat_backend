const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    projectCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    longOverview: {
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

    gallery: {
      type: [
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
      default: [],
    },

    technologies: {
      type: [String],
      required: true,
    },

    year: {
      type: String,
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
      default: "draft",
    },

    keyConcepts: {
      type: [String],
      required: true,
    },
    systemProcess: {
      type: [String],
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
