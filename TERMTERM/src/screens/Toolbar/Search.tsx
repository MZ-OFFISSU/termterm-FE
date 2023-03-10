import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TitleBar } from "@components/header";
import { SearchBox } from "@components/search";
import { RecentSearched } from "@components/search/containers";
import { useState } from "react";
import { useSearch } from "@hooks/useSearch";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const Search = ({ navigation }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [records, setRecords] = useSearch();
  const [COLOR] = useThemeStyle();

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container stickyHeaderIndices={[0]}>
        <TitleBar title="검색" />
        <CotentsArea>
          <SearchBox
            onSubmitEditing={() => setRecords([...records, keyword])}
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
          />
          <RecentSearched />
        </CotentsArea>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const CotentsArea = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px 16px;
`;

export default Search;
