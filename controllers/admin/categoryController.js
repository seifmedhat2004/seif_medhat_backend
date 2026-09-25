const asyncHandler = require("express-async-handler");
const {
  addCategoryService,
  deleteCategoryService,
  updateCategoryService,
  getAllCategoriesService,
} = require("../../services/admin/categoryService");

exports.addCategoryController = asyncHandler(async (req, res) => {
  const result = await addCategoryService(req.body);
  res.status(200).json({
    result,
  });
});

exports.deleteCategoryController = asyncHandler(async (req, res) => {
  const result = await deleteCategoryService(req.params.categoryID );
  res.status(200).json({
    result,
  });
});

exports.updatedCategoryController = asyncHandler(async (req, res) => {
  const result = await updateCategoryService(req.params.categoryID, req.body);
  res.status(200).json({
    result,
  });
});

exports.getAllCategoriesController = asyncHandler(async (req, res) => {
  const result = await getAllCategoriesService();
  res.status(200).json({
    result,
  });
});
