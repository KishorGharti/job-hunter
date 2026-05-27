import bcrypt from "bcryptjs";

import User from "../models/user.models.js";


export const verifyOtp = async (req,res,next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified"
      });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    const isMatch = await bcrypt.compare(
      otp,
      user.otp
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    user.isVerified = true;

    user.otp = null;
    user.otpExpire = null;

    await user.save();

    return res.status(200).json({

      success: true,

      message:
        "Email verified successfully"

    });

  } catch (err) {
    next(err);
  }

};