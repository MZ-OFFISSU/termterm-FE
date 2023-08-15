import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useEffect, useState } from "react";
import TermPreviewBox from "@components/curation/detail/term/TermPreviewBox";
import TermApi from "@api/TermApi";
import { TermConfig, TermItem } from "Term";
import { useTerm } from "@hooks/useTerm";
import { getAccessToken } from "@utils/tokenHandler";

export type Props = StackScreenProps<RootStackParamList, "AllTerms">;

/**
 * 용어 전체페이지
 */
const AllTerms = ({ navigation }: Props) => {
  const termApi = new TermApi();
  const { totalTermList, getAllTermList } = useTerm();
  const [COLOR, mode] = useThemeStyle();
  const [termConfig, setTermConfig] = useState<TermConfig>({
    category: "pm",
    page: 3,
    size: 10,
  });

  useEffect(() => {
    getAllTermList(termConfig);
  }, []);

  return (
    <Container COLOR={COLOR}>
      <InnerContainer>
        {totalTermList.map((term) => (
          <TermPreviewBox {...term} key={term.id} />
        ))}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const InnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default AllTerms;
