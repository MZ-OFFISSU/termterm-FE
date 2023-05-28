/**
 * 단어 관련된 모든 Props
 */
interface WordProps {
  id: number;
  name: string;
  description: string;
  source: string;
  categories: Array<Category>;
  comments: Array<Comment>;
}

interface Category {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  content: string;
  likeCnt: number;
  authorName: string;
  authorJob: string;
  createdDate: string;
}

export { WordProps };