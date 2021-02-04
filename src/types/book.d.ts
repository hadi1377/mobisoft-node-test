declare namespace Book {
  export interface ModifyInfo {
    title: string;
    description: string;
    authors: string[];
    categories: string[];
    pageCount: number;
    publishDate: string;
    publisher: string;
    imagePath?: string;
  }

  export interface SearchQueryParams {
    isGoogle?: string | null;
    title?: string | null;
    author?: string | null;
    publisher?: string | null;
    subject?: string | null;
    // page?: number;
    // perPage?: number;
  }
}
