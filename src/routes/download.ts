import { Router } from "express";

import RequestCore from "@requests/RequestCore";
import DownloadController from "@controllers/v1/shared/DownloadController";

const requests = new RequestCore();
const downloadController = new DownloadController();

const router = Router();

router.get(
  "/books/:bookID.:ext",
  requests.isThereModel("param", "book"),
  downloadController.downloadBookImage
);

export default router;
