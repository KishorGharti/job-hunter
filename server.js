import app from "./app.js";
import 'dotenv/config'
import { connectDb } from "./config/db.js";

connectDb();
app.listen(process.env.PORT, () => {
  console.log('Server is running')
})