import express from "express";

import {verifyOtp} from "../controllers/otp.controllers.js";

const router = express.Router();

router.post("/verify-otp", verifyOtp);

export default router;