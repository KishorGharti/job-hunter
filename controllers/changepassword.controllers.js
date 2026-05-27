import bcrypt from "bcryptjs";
import User from "../models/user.models.js";

export const changePassword = async (req, res, next) => {
  try {

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect"
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (err) {
    next(err);
  }
};