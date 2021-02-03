import { Router } from "express";

import AuthController from "@controllers/v1/shared/auth/AuthController";
import AuthRoutesRequests from "@requests/AuthRoutesRequests";

const router = Router();
const authController = new AuthController();
const authRoutesRequests = new AuthRoutesRequests();

router.post(
  "/register",
  authRoutesRequests.register(),
  authRoutesRequests.isUniqueModel("body", "email", "User", "email"),
  authController.register
);
router.post("/login", authRoutesRequests.login(), authController.login);

export default router;
