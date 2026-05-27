import bcrypt from "bcryptjs";

import User from "../models/user.models.js";

import { generateOtp } from "../utils/generateOtp.js";

import { sendOtpEmail } from "../utils/sendEmail.js";


export const resendOtp = async (req,res,next) => {
    try {
    const { email } = req.body;
    const user = await User.findOne({ email });

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

    if (
      user.lastOtpSentAt &&
      Date.now() - user.lastOtpSentAt <
      30 * 1000
    ) {

      return res.status(429).json({

        success: false,

        message:
          "Please wait 30 seconds before requesting another OTP"

      });

    }

    if (user.otpRequestCount >= 5) {

      return res.status(429).json({

        success: false,

        message:
          "Maximum OTP request limit reached"

      });

    }

    const otp = generateOtp();

    const hashedOtp =
      await bcrypt.hash(otp, 10);

    const otpExpire =
      Date.now() + 5 * 60 * 1000;

    user.otp = hashedOtp;

    user.otpExpire = otpExpire;

    user.lastOtpSentAt = Date.now();

    user.otpRequestCount += 1;

    await user.save();

    await sendOtpEmail(email, otp);

    return res.status(200).json({

      success: true,

      message:
        "New OTP sent successfully"

    });

  } catch (err) {
    next(err);
  }

};