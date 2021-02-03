import BookController from "@controllers/v1/shared/book/BookController";
import { Router } from "express";

const bookController = new BookController();

const router = Router();

router.post("/book", bookController.createBook);

export default router;
