import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

import { generateOtp } from "../utils/generateOtp.js";
import { sendOtpEmail } from "../utils/sendEmail.js";

export const registerController = async (req, res, next) => {
  try {

    const { name, email, password, phone } = req.body;

    const role =
      email === process.env.ADMIN_EMAIL
        ? "admin"
        : "user";

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const otp = generateOtp();

    const hashedOtp = await bcrypt.hash(otp, 10);

    const otpExpire = Date.now() + 5 * 60 * 1000;

    await User.create({
      name,
      email,
      password: hashPassword,
      phone,
      role,

      otp: hashedOtp,
      otpExpire,

      isVerified: false
    });

     await sendOtpEmail(email, otp);

    return res.status(201).json({
      success: true,
      message: "OTP sent to your email"
    });

  } catch (err) {
    next(err);
  }
};