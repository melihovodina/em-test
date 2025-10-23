import express, { Application } from "express"
import cors from "cors"
import router from "./router/index"
import { connectDB } from "./config/db"
import { ErrorMiddleware } from "./middlewares/error.middleware";

const app: Application = express()

app.use(express.json())
app.use(cors())
app.use("/api", router)
app.use(ErrorMiddleware)

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port`);
  });
})();