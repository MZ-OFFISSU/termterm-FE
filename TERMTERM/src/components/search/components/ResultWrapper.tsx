import TermBox from "@components/common/TermBox";
import styled from "styled-components/native";
import { ViewProps } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { SearchResult } from "Term";
import { booleanConverter } from "@utils/booleanConverter";

interface Props extends ViewProps {
  results: Array<SearchResult>;
}

/**
 * 검색 결과들 리스트로 보여주는 컴포넌트
 */
const ResultWrapper = ({ results, ...props }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Container>
      {results.map((result) => (
        <TermBox
          id={result.id}
          title={result.name}
          marked={booleanConverter(result.bookmarked)}
          key={`${result.id}`}
          onPress={() => navigation.navigate("TermDetail", { id: result.id })}
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
