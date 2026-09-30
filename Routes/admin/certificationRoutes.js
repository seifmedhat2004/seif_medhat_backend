const express = require("express");
const router = express.Router();
const protect = require("../../Middlewares/authMiddleware");
const {
  addCertificationController,
  updateCertificationController,
  deleteCertificationContoller,
  getAllCertificationController,
} = require("../../controllers/admin/certificationController");
const upload = require("../../Middlewares/uploadMiddleware");

router.post(
  "/add-certificat",
  protect,
  upload.fields([{ name: "mainImage", maxCount: 1 }]),
  addCertificationController,
);
router.get("/certifications", protect, getAllCertificationController);
router.patch(
  "/certificat/:certificatID",
  protect,
  upload.fields([{ name: "mainImage", maxCount: 1 }]),
  updateCertificationController,
);

router.delete(
  "/delete-certificat/:certificatID",
  protect,
  deleteCertificationContoller,
);
module.exports = router;
