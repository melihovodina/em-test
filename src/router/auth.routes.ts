import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { createUserSchema } from "../schemas/user.schema";
import { validateSchema } from "../middlewares/validateSchema.middleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", validateSchema(createUserSchema), AuthController.register);

export default router;
