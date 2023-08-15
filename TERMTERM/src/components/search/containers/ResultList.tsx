import { ViewProps } from "react-native";
import {
  ContentsWrapper,
  ContentsHeader,
  ResultWrapper,
} from "@components/search";
import { SearchResultProps } from "@interfaces/search";

interface Props extends ViewProps {
  results: Array<SearchResultProps>;
}

/**
 * 검색페이지에서 검색 결과 부분의 Wrapper 컴포넌트
 */
const ResultList = ({ results, ...props }: Props) => {
  return results.length > 0 ? (
    <ContentsWrapper {...props}>
      <ContentsHeader title="용어" style={{ marginBottom: 8 }} />
      <ResultWrapper results={results} />
    </ContentsWrapper>
  ) : (
    <></>
  );
};

export default ResultList;
