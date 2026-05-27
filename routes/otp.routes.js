import express from "express";

import {verifyOtp} from "../controllers/otp.controllers.js";
import { resendOtp } from "../controllers/resendotp.controllers.js";

const router = express.Router();

router.post("/verify-otp", verifyOtp);
router.post("/resend-otp",resendOtp);

export default router;