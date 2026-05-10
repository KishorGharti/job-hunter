import Application from "../models/application.models.js";
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ["pending", "accepted", "rejected"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Status updated",
      application
    });

  } catch (err) {
    next(err);
  }
};