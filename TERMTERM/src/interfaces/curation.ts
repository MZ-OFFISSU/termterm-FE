import { ViewProps } from "react-native";

/**
 * 큐레이션 아이템 인터페이스인터페이스
 *
 */
export interface CurationItemProps extends ViewProps {
  id: number;
  title: string;
  img: string;
  counts: number;
  marked: boolean;
}

export interface TermSimple {
  id: number;
  name: string;
  description: string;
  bookmarked: string;
}

export interface MoreRecommendedCuration {
  curationId: number;
  bookmarked: string | null;
  title: string;
  cnt: number;
  description: string;
}

export interface CurationData {
  title: string;
  cnt: number;
  description: string;
  bookmarked: string;
  paid: boolean;
  termSimples: TermSimple[];
  moreRecommendedCurations: MoreRecommendedCuration[];
  tags: string[];
}
