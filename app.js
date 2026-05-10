import express from "express";
import { errorMiddleware } from "./middlewares/error.midlewares.js";
import router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

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
app.use(mongoSanitize());
app.use(xss());

app.use('/api/auth', router);
app.use(errorMiddleware);

export default app;