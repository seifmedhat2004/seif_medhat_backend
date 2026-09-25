const Category = require("../../models/projectCategoryModel");
const {
  categoryValidation,
} = require("../../utils/validators/categoryValidation");
const errors = require("../../Trash/errors");
//AddCatrgory
exports.addCategoryService = async (categoryData) => {
  const { name, icon, accentColor } = categoryData;
  categoryValidation(name, icon, accentColor);
  const existCategory = await Category.findOne({ name });
  if (existCategory) {
    errors.badRequestError("Category already exist", "CATEGORY_ALREADY_EXIST");
  }
  const category = await Category.create({ name, icon, accentColor });
  return {
    success: true,
    message: "Category added successfully",
    category,
  };
};

//delete Category

exports.deleteCategoryService = async (categoryID) => {
  const category = await Category.findByIdAndDelete(categoryID);
  if (!category) {
    errors.notFoundError("no category found", "CATEGORY_NOT_FOUND");
  }

  return {
    success: true,
    message: "The category deleted successfully",
  };
};

//update Category
exports.updateCategoryService = async (categoryID, categoryData) => {
  const category = await Category.findByIdAndUpdate(categoryID, categoryData, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!category) {
    errors.notFoundError("Category not found", "CATEGORY_NOT_FOUND");
  }
  return {
    success: true,
    message: "Category updated successfully",
    category,
  };
};

//getallCategory

exports.getAllCategoriesService = async () => {
  const categories = await Category.find();
  if (!categories.length) {
    errors.notFoundError("No Category Found", "CATEGORY_NOT_FOUND");
  }
  return {
    success: true,
    message: "Categories fecthed successfully",
    categories,
  };
};
