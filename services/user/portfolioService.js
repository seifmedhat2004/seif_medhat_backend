const Profile = require("../../models/profileModel");
const Skills = require("../../models/skillsModel");
const Category = require("../../models/projectCategoryModel");
const Projects = require("../../models/projectsModel");

exports.getPortfolioService = async () => {
  const [profile, skills, projects, category] = await Promise.all([
    Profile.findOne({ singletonKey: "main" }),

    Skills.find(),

    Projects.find({
      projectStatus: "published",
    })
      .select("title description mainImage technologies year githubUrl")
      .limit(4),

    Category.find(),
  ]);

  return {
    success: true,
    data: {
      profile,
      projects,
      skills,
      category,
    },
  };
};
