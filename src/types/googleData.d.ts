declare namespace GoogleBooks {
  export interface Result {
    kind: string;
    totalItems: number;
    items: Item[];
  }
  export interface Item {
    id: string;
    volumeInfo: VolumeInfo;
    searchInfo?: SearchInfo;
  }
  export interface VolumeInfo {
    title: string;
    authors: string[];
    publishedDate: string;
    pageCount: number;
    categories: string[];
    infoLink: string;
    imageLinks: ImageLinks;
  }

  export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
  }

  export interface SearchInfo {
    textSnippet?: string;
  }
}
