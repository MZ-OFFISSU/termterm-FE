import styled from "styled-components/native";
import { NotResult, SearchBox } from "@components/search";
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
import { useTerm } from "@hooks/useTerm";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const Search = ({ navigation }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [records, setRecords] = useSearch();
  const { results, searchTerm } = useTerm();

  const [COLOR, mode] = useThemeStyle();

  const handleSearch = async () => {
    await searchTerm(keyword);
    if (keyword !== "") setRecords([...records, keyword]);
  };

  const Nothing = () => {
    if (results.length === 0 && records.length === 0)
      return (
        <NotResult
          title="최근 검색어가 없어요."
          subtitle="다양한 키워드로 검색해보세요."
        />
      );

    if (results.length === 0)
      return (
        <NotResult
          title="검색 결과가 없어요."
          subtitle="다양한 키워드로 검색해보세요."
        />
      );

    return <></>;
  };

  return (
    <Container COLOR={COLOR}>
      <CotentsArea>
        <SearchBox
          onSubmitEditing={handleSearch}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
        <Nothing />
        <ResultList results={results} />
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
