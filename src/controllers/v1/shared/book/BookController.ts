import { RequestHandler } from "express";

import BookRepository from "@repositories/BookRepository";
import errorThrower from "@helpers/errorThrower";

class BookController {
  protected bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  public findABook: RequestHandler = async (req, res, next) => {
    try {
      errorThrower(req);
      const { bookID } = req.params;
      const theBook = await this.bookRepository.findById(bookID);
      res.status(200).json({
        statusCode: 200,
        ...theBook,
      });
    } catch (err) {
      next(err);
    }
  };

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

  public updateBook: RequestHandler = async (req, res, next) => {
    try {
      errorThrower(req);
      const data: Book.ModifyInfo = req.body;
      data.imagePath = req.file ? req.file.path : null;
      const { bookID } = req.params;
      const updatedBook = await this.bookRepository.findByIdAndUpdateBook(
        bookID,
        data
      );
      res.status(200).json({
        statusCode: 200,
        message: "The book updated successfully!",
        ...updatedBook,
      });
    } catch (err) {
      next(err);
    }
  };

  public destroyBook: RequestHandler = async (req, res, next) => {
    try {
      errorThrower(req);
      const { bookID } = req.params;
      await this.bookRepository.findByIdAndDeleteBook(bookID);
      res.status(200).json({
        statusCode: 200,
        message: "The book deleted successfully!",
      });
    } catch (err) {
      next(err);
    }
  };
}

export default BookController;
