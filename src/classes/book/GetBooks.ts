import { Request } from "express";

class GetBooks {
  protected queryParams: Book.SearchQueryParams;

  constructor(queryParams: Book.SearchQueryParams) {
    this.queryParams = queryParams;
  }
}

export default GetBooks;
