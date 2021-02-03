import { Router } from "express";

import * as DownloadController from "@controllers/v1/shared/DownloadController";
import RequestCore from "@requests/RequestCore";

const router = Router();
const requests = new RequestCore();

router.get(
  "/user/:userID.jpg",
  requests.isThereModel("param", "user"),
  DownloadController.downloadUserProfile
);

export default router;
