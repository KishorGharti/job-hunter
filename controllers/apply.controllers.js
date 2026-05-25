import Application from "../models/application.models.js";
import Job from "../models/job.models.js";
import User from "../models/user.models.js";

export const applyJob = async (req, res, next) => {
  try {

    const { jobId } = req.params;


    const checkJob = await Job.findById(jobId);

    if (!checkJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }


    if (req.user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot apply for jobs"
      });
    }


    const user = await User.findById(req.user.userId);


    if (!user.resume) {
      return res.status(400).json({
        success: false,
        message: "Please upload resume first"
      });
    }


    const existingApplication = await Application.findOne({
      userId: req.user.userId,
      jobId
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job"
      });
    }

   
    const newApplication = await Application.create({
      userId: req.user.userId,
      jobId,
      resume: user.resume
    });

    return res.status(201).json({
      success: true,
      message: "Applied successfully",
      application: newApplication
    });

  } catch (err) {
    next(err);
  }
};