const Profile = require("../../models/profileModel");
const Skills = require("../../models/skillsModel");
const Category = require("../../models/projectCategoryModel");
const Projects = require("../../models/projectsModel");
const Certification = require("../../models/certificateModel");

exports.getPortfolioService = async () => {
  const [profile, skills, projects, category, certification] =
    await Promise.all([
      Profile.findOne({ singletonKey: "main" }),

      Skills.find(),

      Projects.find({
        projectStatus: "published",
        isFeatured: true,
      })
        .select(
          "title description mainImage technologies year githubUrl projectCategory",
        )
        .populate("projectCategory", "name icon accentColor")
        .limit(4),

      Category.find(),
      Certification.find({ isFeatured: true }),
    ]);

  return {
    success: true,
    data: {
      profile,
      projects,
      skills,
      category,
      certification,
    },
  };
};
