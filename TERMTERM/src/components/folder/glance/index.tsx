import TermBox from "@components/common/TermBox";
import styled from "styled-components/native";
import { ViewProps } from "react-native";
import { FolderPreview } from "Folder";

interface Props extends ViewProps {
  terms: FolderPreview;
}

const TermDetailGlance = ({ terms, ...props }: Props) => {
  return (
    <Container {...props}>
      {terms.terms.map((term) => (
        <TermBox
          id={term.termId}
          title={term.name}
          marked={true}
          key={term.termId}
          bookmarkDisabled
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
