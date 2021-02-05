import { Router } from "express";

import UserController from "@controllers/v1/shared/auth/UserController";
import RequestCore from "@requests/RequestCore";

const router = Router();
const userController = new UserController();
const requests = new RequestCore();

router.get("/users", userController.getUsersList);
router.get(
  "/user/:userID",
  requests.isThereModel("param", "User"),
  userController.getUserByID
);

export default router;
