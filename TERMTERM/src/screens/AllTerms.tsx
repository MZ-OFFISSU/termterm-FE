import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useCallback, useEffect, useState } from "react";
import TermPreviewBox from "@components/curation/detail/term/TermPreviewBox";
import { TermConfig } from "Term";
import { useTerm } from "@hooks/useTerm";
import { RefreshControl } from "react-native";

export type Props = StackScreenProps<RootStackParamList, "AllTerms">;

/**
 * 용어 전체페이지
 */
const AllTerms = ({ navigation }: Props) => {
  const { totalTermList, getAllTermList } = useTerm();
  const [COLOR, mode] = useThemeStyle();
  // TODO : 임시 설정 값 돌려놓기
  const [termConfig, setTermConfig] = useState<TermConfig>({
    // TODO : 카테고리 배열 디버깅
    categories: ["pm", "development"],
  });
  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    try {
      getAllTermList(termConfig);
      setRefresh(false);
    } catch (err) {
      setTimeout(() => {
        setRefresh(false);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    getAllTermList(termConfig);
  }, []);

  return (
    <Container
      COLOR={COLOR}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
      }
    >
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
