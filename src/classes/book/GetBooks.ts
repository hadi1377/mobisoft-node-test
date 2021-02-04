import trueToTrue from "@helpers/trueToTrue";
import { Request } from "express";
import GetBooksFromDB from "./GetBooksFromDB";
import GetBooksFromGoogle from "./GetBooksFromGoogle";

class GetBooks {
  protected queryParams: Book.SearchQueryParams;

  constructor(queryParams: Book.SearchQueryParams) {
    this.queryParams = queryParams;
  }

  public exec = async () => {
    return {
      books: trueToTrue(this.queryParams.isGoogle)
        ? await this.getFromGoogle()
        : await this.getFromDB(),
    };
  };

  protected getFromGoogle = async () => {
    const getBooksFromGoogle = new GetBooksFromGoogle(this.queryParams);
    return await getBooksFromGoogle.exec();
  };

  protected getFromDB = async () => {
    const getBooksFromGoogle = new GetBooksFromDB(this.queryParams);
    return await getBooksFromGoogle.exec();
  };
}

export default GetBooks;
