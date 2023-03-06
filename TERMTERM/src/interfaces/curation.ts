import { ViewProps } from "react-native";

/**
 * 큐레이션 아이템 인터페이스인터페이스
 *
 */
export interface CurationItemProps extends ViewProps {
  title: string;
  img: string;
  counts: number;
  marked: boolean;
}
