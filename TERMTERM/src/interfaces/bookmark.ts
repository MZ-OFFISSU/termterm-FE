/**
 * 폴더 메타데이터
 */
export interface FolderProps {
  id: number;
  name: string;
  desc: string;
  icon: number;
  terms: Array<TermProps>;
}

export interface TermProps {
  id: number;
  term: string;
}
