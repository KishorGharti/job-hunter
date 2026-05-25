import Application from "../models/application.models.js";
export const getAdminApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate({
        path: "userId",
        select: "name email phone resume"
      })
      .populate({
        path: "jobId",
        select: "title location" 
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications
    });

  } catch (err) {
    next(err);
  }
};