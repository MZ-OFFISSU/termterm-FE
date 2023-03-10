import Result from "./Result";
import styled from "styled-components/native";
import { ViewProps } from "react-native";

interface Props extends ViewProps {
  results: Array<string>;
}

const ResultWrapper = ({ results, ...props }: Props) => {
  return (
    <Container>
      {results.map((result, idx) => (
        <Result title={result} marked={false} key={`${result}-${idx}`}></Result>
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
