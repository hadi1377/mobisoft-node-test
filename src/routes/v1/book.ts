import { Router } from "express";

import Multer from "@config/Multer";
import BookController from "@controllers/v1/shared/book/BookController";
import { isAuth } from "@middlewares/AuthMiddlewares";
import BookRoutesRequests from "@requests/BookRoutesRequests";

const bookController = new BookController();
const uploader = new Multer("books");
const bookRequests = new BookRoutesRequests();

const router = Router();

router.get("/books", bookController.fetchAllBooks);
router.get(
  "/book/:bookID",
  bookRequests.isThereModel("param", "Book"),
  bookController.findABook
);

router.post(
  "/book",
  isAuth,
  bookRequests.createBookRequest(),
  uploader.createDisk().single("image"),
  bookController.createBook
);

// Book images
router.post(
  "/book/:bookID/change-image",
  isAuth,
  bookRequests.addBookImageRequest(),
  uploader.createDisk().single("image"),
  bookController.changeImage
);
router.delete(
  "/book/:bookID/remove-image",
  isAuth,
  bookRequests.addBookImageRequest(),
  bookController.removeImage
);

// Update book
router.put(
  "/book/:bookID",
  isAuth,
  bookRequests.updateBookRequest(),
  uploader.createDisk().single("image"),
  bookController.updateBook
);

// Delete book
router.delete(
  "/book/:bookID",
  isAuth,
  bookRequests.deleteBookRequest(),
  bookController.destroyBook
);

export default router;
