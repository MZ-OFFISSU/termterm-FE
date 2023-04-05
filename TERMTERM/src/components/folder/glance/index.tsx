import TermBox from "@components/common/TermBox";
import styled from "styled-components/native";
import { ViewProps } from "react-native";
import { Term } from "@interfaces/term";

interface Props extends ViewProps {
  terms: Array<Term>;
}

const TermDetailGlance = ({ terms, ...props }: Props) => {
  return (
    <Container {...props}>
      {terms.map((term, idx) => (
        <TermBox
          title={term.name}
          marked={term.bookmarked}
          key={term.id}
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
  padding-bottom: 40px;
`;

export default TermDetailGlance;
