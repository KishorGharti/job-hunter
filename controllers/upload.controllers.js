import cloudinary from "../config/cloudinary.js";
import User from "../models/user.models.js";

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files allowed"
      });
    }

    const fileBase64 = req.file.buffer.toString("base64");

    const dataUri = `data:${req.file.mimetype};base64,${fileBase64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "resumes",
      resource_type: "auto"
    });

    await User.findByIdAndUpdate(
      req.user.userId,
      { resume: result.secure_url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      url: result.secure_url
    });

  } catch (err) {
    next(err);
  }
};