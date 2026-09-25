const express = require("express");
const router = express.Router();
const protect = require("../../Middlewares/authMiddleware");

const {addCategoryController,deleteCategoryController,updatedCategoryController,getAllCategoriesController}= require("../../controllers/admin/categoryController")

router.post("/addCategory",protect,addCategoryController)

router.delete("/deleteCategory/:categoryID",protect,deleteCategoryController)

router.patch("/updateCategory/:categoryID",protect,updatedCategoryController)

router.get("/Categories",protect,getAllCategoriesController)
module.exports = router;
