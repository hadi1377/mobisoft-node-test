import { Router } from "express";

import AuthController from "@controllers/v1/shared/auth/AuthController";
import UserController from "@controllers/v1/shared/auth/UserController";
import AuthRoutesRequests from "@requests/AuthRoutesRequests";
import * as AuthMiddlewares from "@middlewares/AuthMiddlewares";

const router = Router();
const authController = new AuthController();
const userController = new UserController();
const authRoutesRequests = new AuthRoutesRequests();

router.get("/users", userController.getUsersList);
router.get(
  "/user/:userID",
  authRoutesRequests.isThereModel("param", "User"),
  userController.getUserByID
);
router.post(
  "/register",
  authRoutesRequests.register(),
  authRoutesRequests.isUniqueModel("body", "email", "User", "email"),
  authController.register
);
router.post("/login", authRoutesRequests.login(), authController.login);

router.get("/me", AuthMiddlewares.isAuth, authController.me);

export default router;
