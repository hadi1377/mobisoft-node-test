import { Router } from "express";

import Multer from "@config/Multer";
import BookController from "@controllers/v1/shared/book/BookController";
import { isAuth } from "@middlewares/AuthMiddlewares";

const bookController = new BookController();
const uploader = new Multer("books");

const router = Router();

router.get("/book/:bookID", bookController.findABook);

router.post(
  "/book",
  isAuth,
  uploader.createDisk().single("image"),
  bookController.createBook
);
router.put(
  "/book/:bookID",
  isAuth,
  uploader.createDisk().single("image"),
  bookController.updateBook
);
router.delete("/book/:bookID", isAuth, bookController.destroyBook);

export default router;
