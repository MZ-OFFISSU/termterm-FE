import TermBox from "@components/common/TermBox";
import styled from "styled-components/native";
import { ViewProps } from "react-native";
import { FolderPreview } from "Folder";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

interface Props extends ViewProps {
  terms: FolderPreview;
}

const TermDetailGlance = ({ terms, ...props }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Container {...props}>
      {terms.terms.map((term) => (
        <TermBox
          id={term.termId}
          title={term.name}
          marked={true}
          key={term.termId}
          onPress={() =>
            navigation.push("TermDetail", { id: `${term.termId}` })
          }
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
