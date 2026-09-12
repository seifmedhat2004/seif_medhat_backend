/**
 * {
  fullName =>string,
  professionalTitle =>string,
  shortBio =>string,
  aboutMe   =>string,
  profileImage =>url=>string, publicId=>string,
  email =>string,
  location =>string,

  

  skills: [
    {
      name => string,
      category => string,
    }
  ],
    education: [{
    institution => string,
    degree => string,
    fieldOfStudy => string,
    startDate => Date,
    endDate => Date,
}],

    certifications: [{
    name => string,
    issuingOrganization => string,
    issueDate => Date,
}]

  
}
 */
const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  professionalTitle: {
    type: String,
    required: true,
  },
  shortBio: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
    required: true,
  },
  profileImage: {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  skills: [
    {
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    },
  ],
  education: [
    {
      institution: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
  ],
  certifications: [
    {
      name: {
        type: String,
        required: true,
      },
      issuingOrganization: {
        type: String,
        required: true,
      },
      issueDate: {
        type: Date,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("Profile", profileSchema);
