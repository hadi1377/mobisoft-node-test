import { RequestHandler } from "express";

import BookRepository from "@repositories/BookRepository";
import errorThrower from "@helpers/errorThrower";

class BookController {
  protected bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  public createBook: RequestHandler = async (req, res, next) => {
    try {
      errorThrower(req);
      const data: Book.ModifyInfo = req.body;
      data.imagePath = req.file ? req.file.path : null;
      const user = req.user;
      const createdBook = await this.bookRepository.createBook(user, data);
      res.status(200).json({
        statusCode: 200,
        message: "The book created successfully!",
        ...createdBook,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default BookController;
