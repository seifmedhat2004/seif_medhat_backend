const cloudinary = require("../../config/cloudinaryConn");
const Certification = require("../../models/certificateModel");
const {
  certificateValidate,
} = require("../../utils/validators/certificateValidate");
const errors = require("../../Trash/errors");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/certifications",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    stream.end(buffer);
  });
};

//addCertificationService
exports.addCertificationService = async (certificateData, files) => {
  const {
    title,
    organization,
    issueDate,
    skills,
    description,
    verificationUrl,
    isFeatured,
  } = certificateData;
  certificateValidate(title, organization, issueDate, skills, description);
  // Main image is required
  if (!files?.mainImage?.[0]) {
    errors.badRequestError("Main image is required", "MAIN_IMAGE_IS_REQUIRED");
  }

  // Upload main image
  const mainImage = await uploadToCloudinary(files.mainImage[0].buffer);

  const certification = await Certification.create({
    title,
    organization,
    issueDate,
    skills,
    description,
    verificationUrl,
    image: {
      url: mainImage.secure_url,
      publicId: mainImage.public_id,
    },
    isFeatured,
  });
  return {
    success: true,
    message: "Certification added successfully",
    certification,
  };
};

exports.updateCertificationService = async (
  certificatID,
  updateBody,
  files,
) => {
  const certification = await Certification.findById(certificatID);

  if (!certification) {
    errors.notFoundError("Certification not found", "CERTIFICATION_NOT_FOUND");
  }

  // Update image if a new one was uploaded
  if (files?.mainImage?.[0]) {
    // Upload new image
    const mainImage = await uploadToCloudinary(files.mainImage[0].buffer);

    // Delete old image from Cloudinary
    if (certification.image?.publicId) {
      await cloudinary.uploader.destroy(certification.image.publicId);
    }

    // Save new image
    certification.image = {
      url: mainImage.secure_url,
      publicId: mainImage.public_id,
    };
  }

  // Update text fields
  Object.assign(certification, updateBody);

  await certification.save();

  return {
    success: true,
    message: "Certification updated successfully",
    certification,
  };
};

//getAllCertificationService
exports.getAllCertificationService = async () => {
  const certifications = await Certification.find();
  if (!certifications.length) {
    errors.notFoundError("no certification found", "NO_CERTIFICATION_FOUND");
  }
  return {
    success: true,
    message: "Certification fetched successfully",
    certifications,
  };
};

//deleteCertificationService =(certificatID)
// delete certification
exports.deleteCertificationService = async (certificatID) => {
  const certification = await Certification.findById(certificatID);

  if (!certification) {
    errors.notFoundError("Certification not found", "CERTIFICATION_NOT_FOUND");
  }

  // Delete certification image from Cloudinary
  if (certification.image?.publicId) {
    await cloudinary.uploader.destroy(certification.image.publicId);
  }

  // Delete certification from MongoDB
  await Certification.findByIdAndDelete(certificatID);

  return {
    success: true,
    message: "Certification deleted successfully",
  };
};
