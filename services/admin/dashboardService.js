const Project = require("../../models/projectsModel");
const Skill = require("../../models/skillsModel");
const Category = require("../../models/projectCategoryModel");
const Message = require("../../models/messageModel");

exports.getDashboardService = async () => {
  const [
    projectsCount,
    publishedProjects,
    unreadMessages,
    skillsCount,
    categoriesCount,
    recentProjects,
    recentMessages,
  ] = await Promise.all([
    // Total Projects
    Project.countDocuments(),

    // Published Projects
    Project.countDocuments({
      projectStatus: "published",
    }),

    // Unread Messages
    Message.countDocuments({
      isRead: false,
    }),

    // Total Skills
    Skill.countDocuments(),

    // Total Categories
    Category.countDocuments(),

    // Recent Projects
    Project.find()
      .populate("projectCategory", "name icon accentColor")
      .select(
        "title mainImage projectCategory projectStatus createdAt updatedAt",
      )
      .sort({ createdAt: -1 })
      .limit(4),

    // Recent Messages
    Message.find()
      .select("name email message isRead createdAt updatedAt")
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  return {
    success: true,
    data: {
      stats: {
        projects: projectsCount,
        publishedProjects,
        unreadMessages,
        skills: skillsCount,
        categories: categoriesCount,
      },

      recentProjects,

      recentMessages,
    },
  };
};