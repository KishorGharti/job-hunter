import express from "express";

import {verifyOtp} from "../controllers/otp.controllers.js";
import { resendOtp } from "../controllers/resendotp.controllers.js";
import { forgotPassword } from "../controllers/forgotpassword.controllers.js";
import { resetPassword } from "../controllers/resetpassword.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { changePassword } from "../controllers/changepassword.controllers.js";

const router = express.Router();

router.post("/verify-otp",verifyOtp);
router.post("/resend-otp",resendOtp);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);
router.put("/change-password",authMiddleware,changePassword);
export default router;