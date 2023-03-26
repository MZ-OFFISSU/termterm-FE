import styled from "styled-components/native";
import { SearchBox } from "@components/search";
import {
  RecentSearched,
  RecommendKeyword,
  RecommendList,
  ResultList,
} from "@components/search/containers";
import { useState } from "react";
import { useSearch } from "@hooks/useSearch";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme } from "@style/designSystem";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const Search = ({ navigation }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [records, setRecords] = useSearch();
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container COLOR={COLOR}>
      <CotentsArea>
        <SearchBox
          onSubmitEditing={() => setRecords([...records, keyword])}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
        {/* <ResultList /> */}
        <RecentSearched />
        <RecommendKeyword />
        <RecommendList navigation={navigation} />
      </CotentsArea>
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const CotentsArea = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 16px;
`;

export default Search;
