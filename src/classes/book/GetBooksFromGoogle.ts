import config from "@config/index";

const GOOGLE_BOOKS_URL = "https://googleapis.com/books/v1/volumes";

class GetBooksFromGoogle {
  protected q: string;
  protected queryParams: Book.SearchQueryParams;

  public exec = async () => {
    return true;
  };

  protected setQueryString = () => {
    const pending = [];
    if (this.queryParams.author)
      pending.push(`+inauthor:${this.queryParams.author}`);
    if (this.queryParams.publisher)
      pending.push(`+inpublisher:${this.queryParams.publisher}`);
    this.q = `?q=${this.queryParams.title || ""}${pending.join("")}`;
    this.q = `&key=${config.googleApiKey}`;
  };

  protected getData = async () => {
    const data = await fetch(`${GOOGLE_BOOKS_URL}${this.q}`, {
      method: "GET",
    });
    console.log(data);
  };
}

export default GetBooksFromGoogle;
