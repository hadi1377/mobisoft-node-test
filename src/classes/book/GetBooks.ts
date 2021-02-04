import { Request } from "express";

class GetBooks {
  protected queryParams: Book.SearchQueryParams;

  constructor(queryParams: Book.SearchQueryParams) {
    this.queryParams = queryParams;
  }

//   public exec = () => {};
}

export default GetBooks;
