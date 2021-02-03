import { Router } from "express";

import AuthController from "@controllers/v1/shared/auth/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
