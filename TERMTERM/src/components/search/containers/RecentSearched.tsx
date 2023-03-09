import { ViewProps } from "react-native";
import {
  ContentsWrapper,
  ContentsHeader,
  LogWrapper,
  NotResult,
} from "@components/search";

interface Props extends ViewProps {
  records: Array<string>;
}

/**
 * 최근 검색 컨테이너 컴포넌트
 */
const RecentSearched = ({ records, ...props }: Props) => {
  return (
    <ContentsWrapper {...props}>
      {records.length > 0 ? (
        <>
          <ContentsHeader title="최근 검색어" />
          <LogWrapper />
        </>
      ) : (
        <NotResult
          title="최근 검색어가 없어요."
          subtitle="다양한 키워드로 검색해보세요."
        />
      )}
    </ContentsWrapper>
  );
};

export default RecentSearched;
