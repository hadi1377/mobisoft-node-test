import fetch from "node-fetch";

import config from "@config/index";

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";

class GetBooksFromGoogle {
  protected q: string;
  protected queryParams: Book.SearchQueryParams;

  constructor(queryParams: Book.SearchQueryParams) {
    this.queryParams = queryParams;
  }

  public exec = async () => {
    this.setQueryString();
    const data = await this.getData();
    return data;
  };

  protected setQueryString = () => {
    const pending = [];
    if (this.queryParams.title)
      pending.push(`+intitle:${this.queryParams.title}`);
    if (this.queryParams.author)
      pending.push(`+inauthor:${this.queryParams.author}`);
    if (this.queryParams.publisher)
      pending.push(`+inpublisher:${this.queryParams.publisher}`);
    this.q = `?q=${this.queryParams.title || ""}${pending.join("")}`;
    this.q = `${this.q}&key=${config.googleApiKey}&country=FR`;
    console.log(this.q);
  };

  protected getData = async () => {
    const data = await fetch(`${GOOGLE_BOOKS_URL}${this.q}`, {
      method: "GET",
    });
    const json: GoogleBooks.Result = await data.json();
    const finalItems = json.items
      ? GetBooksFromGoogle.transformData(json.items)
      : [];
    return finalItems;
  };

  protected static transformData = (items: GoogleBooks.Item[]) => {
    return items.map((item) => {
      return {
        title: item.volumeInfo.title,
        userId: 0,
        user: null,
        isFromGoogle: true,
        externalLink: item.volumeInfo.infoLink,
        description: (item.searchInfo && item.searchInfo.textSnippet) || "",
        authors: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(",")
          : "",
        categories: item.volumeInfo.categories
          ? item.volumeInfo.categories.join(",")
          : "",
        pageCount: item.volumeInfo.pageCount,
        publisher: "",
        publishDate: item.volumeInfo.publishedDate,
        imagePath:
          item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail,
        createdAt: null,
        updatedAt: null,
      };
    });
  };
}

export default GetBooksFromGoogle;
