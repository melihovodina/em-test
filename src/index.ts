import express, { Application } from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import cookieParser from 'cookie-parser';
import router from "./router/index"
import { connectDB } from "./config/db"
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { swaggerSpec } from "./config/swagger";

const app: Application = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    requestCredentials: 'include'
  }
}));
app.use("/api", router)
app.use(ErrorMiddleware)

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port`);
  });
})();