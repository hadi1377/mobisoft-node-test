import Book from "@models/Book";
import { check, param, body } from "express-validator";

import RequestCore from "./RequestCore";

class BookRoutesRequests extends RequestCore {
  public createBookRequest = () => {
    return [
      this.commonValidationChains("title"),
      this.commonValidationChains("description"),
      this.commonValidationChains("authors"),
      this.commonValidationChains("categories"),
      this.commonValidationChains("pageCount"),
    ];
  };

  public updateBookRequest = () => {
    return [
      this.commonValidationChains("checkIfItIsUsers"),
      this.commonValidationChains("title"),
      this.commonValidationChains("description"),
      this.commonValidationChains("authors"),
      this.commonValidationChains("categories"),
      this.commonValidationChains("pageCount"),
    ];
  };

  public deleteBookRequest = () => {
    return [this.commonValidationChains("checkIfItIsUsers")];
  };

  public addBookImageRequest = () => {
    return [this.commonValidationChains("checkIfItIsUsers")];
  };

  public removeBookImageRequest = () => {
    return [this.commonValidationChains("checkIfItIsUsers")];
  };

  protected commonValidationChains = (key: string) => {
    const obj = {
      title: check("title")
        .exists()
        .withMessage("Please set the title!")
        .notEmpty()
        .withMessage("Please set the title!")
        .isLength({ min: 2, max: 255 })
        .withMessage(
          "Book's title length should be between 2 and 255 characters!"
        ),
      description: check("description").optional({ nullable: true }),
      authors: check("authors")
        .isArray()
        .withMessage("Authors field should be a list!")
        .custom(
          (val) =>
            val.length ||
            Promise.reject("Please add at least one author to this book!")
        ),
      categories: check("categories")
        .optional({ nullable: false })
        .isArray()
        .withMessage("Categories should be a list!"),
      pageCount: check("pageCount")
        .exists()
        .withMessage("Please set page count!")
        .isNumeric()
        .withMessage("Pages count should be a number!"),
      checkIfItIsUsers: param("bookID").custom((bookID, { req }) => {
        return Book.findByPk(bookID).then((book) => {
          if (!book) return Promise.reject("Book not found!");
          if (book.userId != req.user.id)
            return Promise.reject("This book does not belong to this user!");
          return true;
        });
      }),
    };
    return obj[key] || undefined;
  };
}

export default BookRoutesRequests;
