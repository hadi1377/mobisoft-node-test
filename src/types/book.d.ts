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
}
