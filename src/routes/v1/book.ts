import { Router } from "express";

import Multer from "@config/Multer";
import BookController from "@controllers/v1/shared/book/BookController";
import { isAuth } from "@middlewares/AuthMiddlewares";

const bookController = new BookController();
const uploader = new Multer("books");

const router = Router();

router.post(
  "/book",
  isAuth,
  uploader.createDisk().single("image"),
  bookController.createBook
);

export default router;
