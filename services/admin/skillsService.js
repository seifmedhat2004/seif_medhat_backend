const Skills = require("../../models/skillsModel");
const errors = require("../../Trash/errors");
const { skillsValidate } = require("../../utils/validators/skillsValidate");
//add skill
exports.addSkillService = async (skillsData) => {
  const { name, category, levelDescription, description, level } = skillsData;
  skillsValidate(name, category, levelDescription, description, level);
  const isExistSkill = await Skills.findOne({ name });
  if (isExistSkill) {
    errors.badRequestError("This skill already exist", "SKILL_IS_EXIST");
  }
  const skill = await Skills.create({
    name,
    category,
    levelDescription,
    description,
    level,
  });
  return {
    success: true,
    message: "the skill added succefully",
    skill,
  };
};

//get skill

exports.getAllSkillsService = async () => {
  const skill = await Skills.find();
  if (!skill.length) {
    errors.notFoundError("there are no skills ", "SKILLS_NOT_FOUND");
  }
  return {
    success: true,
    message: "Skills fetched successfully",
    skill,
  };
};

//update skill
exports.updateSkillService = async (skillID, updateSkillData) => {
  const skill = await Skills.findByIdAndUpdate(skillID, updateSkillData, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!skill) {
    errors.notFoundError("skill not found", "SKILL_NOT_FOUND");
  }
  return({
    success: true,
    message: "skill updated successfully",
    skill,
  });
};

//delete skill
exports.deleteSkillService = async (skillID) => {
  const skill = await Skills.findByIdAndDelete(skillID);
  if (!skill) {
    errors.notFoundError("skill not found", "SKILL_NOT_FOUND");
  }
  return {
    success: true,
    message: "Skill deleted successfully",
  };
};
