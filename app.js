import express from "express";
import { errorMiddleware } from "./middlewares/error.midlewares.js";
import router from "./routes/auth.routes.js";

const app = express()
app.use(express.json())

app.use('/api/auth',router)
app.use(errorMiddleware)


export default app;