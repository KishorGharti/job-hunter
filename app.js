import express from "express";
import { errorMiddleware } from "./middlewares/error.midlewares.js";
import router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',router)
app.use(errorMiddleware)


export default app;