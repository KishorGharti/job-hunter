import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendOtpEmail } from "../utils/sendEmail.js";

export const forgotPassword = async (req, res, next) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (
      user.lastResetOtpSentAt &&
      Date.now() - user.lastResetOtpSentAt < 30 * 1000
    ) {
      return res.status(429).json({
        success: false,
        message: "Please wait 30 seconds before requesting another OTP"
      });
    }

    if (user.resetPasswordRequestCount >= 5) {
      return res.status(429).json({
        success: false,
        message: "Maximum OTP request limit reached"
      });
    }

    const otp = generateOtp();

    const hashedOtp = await bcrypt.hash(otp, 10);

    user.resetPasswordOtp = hashedOtp;

    user.resetPasswordOtpExpire =
      Date.now() + 5 * 60 * 1000;

    user.lastResetOtpSentAt = Date.now();

    user.resetPasswordRequestCount += 1;

    await user.save();

    await sendOtpEmail(email, otp);

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully"
    });

  } catch (err) {
    next(err);
  }
};

