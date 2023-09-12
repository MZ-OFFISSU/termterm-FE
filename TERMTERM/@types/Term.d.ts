declare module "Term" {
  export type TermItem = {
    bookmarked: "NO" | "YES";
    description: string;
    id: number;
    name: string;
  };

  export type TermComment = {
    authorJob: string;
    authorName: string;
    authorProfileImageUrl: string;
    content: string;
    createdDate: string;
    id: number;
    likeCnt: number;
    liked: "NO" | "YES";
    source: string;
  };

  export type TermDetail = {
    bookmarked: "NO" | "YES";
    categories: string[];
    comments: TermComment[];
    description: string;
    id: number;
    name: string;
    source: string;
  };

  export type TermConfig = {
    /** 카테고리 배열 */
    categories: string[];
  };

  type Pageable = {
    page: number;
    size: number;
    sort: string;
  };

  type Sort = {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };

  export type TermResponse = {
    content: TermItem[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;
  };

  export type SearchResult = {
    bookmarked: "YES" | "NO";
    id: number;
    name: string;
  };

  export type TermPreview = {
    name: string;
    termId: number;
  };
}
