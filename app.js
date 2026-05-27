import express from "express";
import { errorMiddleware } from "./middlewares/error.midlewares.js";
import router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import profileRoutes from "./routes/profile.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import 'dotenv/config'


const app = express();

app.disable("x-powered-by");
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", profileRoutes);
app.use('/api/auth', router);
app.use("/api/otp", otpRoutes);

app.use(errorMiddleware);

export default app;