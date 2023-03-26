/**
 * 단어 카테고리 (개발, 디자인 ...)
 */
export interface Category {
  id: number;
  name: string;
}

/**
 * 댓글
 */
export interface Comment {
  id: number;
  content: string;
  source: string;
  likeCnt: number;
  authorName: string;
  authorJob: string;
  createdDate: string;
}

/**
 * 단어
 */
export interface Term {
  id: number;
  name: string;
  description: string;
  source: string;
  bookmarked: boolean;
  categories: Array<Category>;
  comments: Array<Comment>;
}
