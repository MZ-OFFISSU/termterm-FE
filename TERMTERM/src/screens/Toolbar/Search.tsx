import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { TitleBar } from "@components/header";
import { SearchBox } from "@components/search";
import { RecentSearched } from "@components/search/containers";
import { useState } from "react";
import { useSearch } from "@hooks/useSearch";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const dummy = ["기획", "루시", "바쁘거든", "채워", "바빠", "바빠유"];

const Search = ({ navigation }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [records, setRecords] = useSearch();

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <Container stickyHeaderIndices={[0]}>
        <TitleBar title="검색" />
        <CotentsArea>
          <SearchBox
            onSubmitEditing={() => setRecords([...records, keyword])}
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
          />
          <RecentSearched records={records} />
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
