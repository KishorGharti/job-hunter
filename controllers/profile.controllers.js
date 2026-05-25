import User from "../models/user.models.js";
import Application from "../models/application.models.js";

export const getProfile = async (req, res, next) => {
  try {


    const user = await User.findById(req.user.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const applications = await Application.find({
      userId: req.user.userId
    })
      .populate("jobId", "title companyName location salary")
      .sort({ createdAt: -1 });

    const totalAppliedJobs = applications.length;

    const acceptedJobs = applications.filter(
      app => app.status === "accepted"
    ).length;

    const pendingJobs = applications.filter(
      app => app.status === "pending"
    ).length;

    const rejectedJobs = applications.filter(
      app => app.status === "rejected"
    ).length;


    return res.status(200).json({
      success: true,

      profile: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        resume: user.resume
      },

      stats: {
        totalAppliedJobs,
        acceptedJobs,
        pendingJobs,
        rejectedJobs
      },

      applications

    });

  } catch (err) {
    next(err);
  }
};


export const cancelApplication = async (req, res, next) => {
  try {

    const { applicationId } = req.params;


    const foundApplication = await Application.findById(applicationId);

    if (!foundApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }


    if (
      foundApplication.userId.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Not allowed"
      });
    }


    if (foundApplication.status === "accepted") {
      return res.status(400).json({
        success: false,
        message: "Accepted application cannot be cancelled"
      });
    }


    await foundApplication.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Application cancelled successfully"
    });

  } catch (err) {
    next(err);
  }
};