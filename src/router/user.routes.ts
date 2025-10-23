import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { createUserSchema } from "../schemas/user.schema";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", AuthMiddleware.isAdmin, UserController.getAll);
router.get("/:id", AuthMiddleware.selfOrAdmin, UserController.getById);
router.put("/:id", AuthMiddleware.selfOrAdmin, UserController.update);
router.delete("/:id", AuthMiddleware.isAdmin, UserController.delete);
router.patch("/:id/block", AuthMiddleware.selfOrAdmin, UserController.block);

export default router;
