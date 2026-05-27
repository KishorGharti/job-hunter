import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendOtpEmail } from "../utils/sendEmail.js";
export const resetPassword = async (req, res, next) => {
  try {

    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (
      !user.resetPasswordOtpExpire ||
      user.resetPasswordOtpExpire < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    const isMatch = await bcrypt.compare(
      otp,
      user.resetPasswordOtp
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpire = null;
    user.resetPasswordRequestCount = 0;
    user.lastResetOtpSentAt = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (err) {
    next(err);
  }
};