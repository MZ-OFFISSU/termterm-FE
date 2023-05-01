import TermBox from "@components/common/TermBox";
import styled from "styled-components/native";
import { ViewProps } from "react-native";
import { SearchResultProps } from "@interfaces/search";

interface Props extends ViewProps {
  results: Array<SearchResultProps>;
}

/**
 * 검색 결과들 리스트로 보여주는 컴포넌트
 */
const ResultWrapper = ({ results, ...props }: Props) => {
  return (
    <Container>
      {results.map((result) => (
        <TermBox
          title={result.name}
          marked={false}
          key={`${result.id}`}
        ></TermBox>
      ))}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default ResultWrapper;
