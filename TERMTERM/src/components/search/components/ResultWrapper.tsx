import TermBox from "@components/common/TermBox";
import styled from "styled-components/native";
import { ViewProps } from "react-native";

interface Props extends ViewProps {
  results: Array<string>;
}

const ResultWrapper = ({ results, ...props }: Props) => {
  return (
    <Container>
      {results.map((result, idx) => (
        <TermBox
          title={result}
          marked={false}
          key={`${result}-${idx}`}
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
