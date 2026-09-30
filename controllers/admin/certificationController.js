const asyncHandler = require("express-async-handler");
const {
  addCertificationService,
  updateCertificationService,
  deleteCertificationService,
  getAllCertificationService,
} = require("../../services/admin/certificateService");

exports.addCertificationController = asyncHandler(async (req, res) => {
  const result = await addCertificationService(req.body, req.files);
  res.status(201).json(result);
});

exports.updateCertificationController = asyncHandler(async (req, res) => {
  const result = await updateCertificationService(
    req.params.certificatID,
    req.body,
    req.files,
  );
  res.status(200).json(result);
});

exports.deleteCertificationContoller = asyncHandler(async (req, res) => {
  const result = await deleteCertificationService(req.params.certificatID);
  res.status(200).json(result);
});

exports.getAllCertificationController = asyncHandler(async (req, res) => {
  const result = await getAllCertificationService();
  res.status(200).json(result);
});
