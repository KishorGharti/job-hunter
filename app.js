import express from "express";
import { errorMiddleware } from "./middlewares/error.midlewares.js";

const app = express()

app.use(express.json())
app.use(errorMiddleware)


export default app;