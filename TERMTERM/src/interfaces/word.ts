/**
 * 단어 관련된 모든 Props
 */
interface WordProps {
  termId: number;
  name: string;
  description: string;
  source: string;
  categories?: Array<string>;
  comments?: Array<Comment>;
  bookmarked?: "YES" | "NO";
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
  source?: string;
  authorProfileImageUrl: string;
  authorJob: string;
  createdDate: string;
}

export { WordProps, Comment };
