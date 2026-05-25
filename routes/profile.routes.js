import express from "express";

import {getProfile,cancelApplication} from "../controllers/profile.controllers.js";

import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/profile",authMiddleware, getProfile);

router.delete( "/application/:applicationId/cancel",authMiddleware,cancelApplication);

export default router;