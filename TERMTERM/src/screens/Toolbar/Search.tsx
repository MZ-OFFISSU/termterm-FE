import styled from "styled-components/native";
import { NotResult, SearchBox } from "@components/search";
import {
  RecentSearched,
  RecommendKeyword,
  RecommendList,
  ResultList,
} from "@components/search/containers";
import { useCallback, useState } from "react";
import { useSearch } from "@hooks/useSearch";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme } from "@style/designSystem";
import { useTerm } from "@hooks/useTerm";
import { RefreshControl } from "react-native";
import { useFolder } from "@hooks/useFolder";
import { useCuration } from "@hooks/useCuration";
import { useMember } from "@hooks/useMember";
import { Category } from "Curation";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const Search = ({ navigation }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [records, setRecords] = useSearch();
  const { results, searchTerm } = useTerm();
  const [refresh, setRefresh] = useState(false);
  const { getUsersFolderList } = useFolder();
  const { getEachCategoryCurationList } = useCuration();
  const { user } = useMember();

  const [COLOR, mode] = useThemeStyle();

  const handleSearch = async (keyword: string) => {
    await searchTerm(keyword);
    if (keyword !== "") setRecords([...records, keyword]);
  };

  const handleRecommendKeyword = async (recommend: string) => {
    setKeyword(recommend);
    await handleSearch(recommend);
  };

  const Nothing = () => {
    if (
      (!results || results.length === 0) &&
      (!records || records.length === 0)
    )
      return (
        <NotResult
          title="최근 검색어가 없어요."
          subtitle="다양한 키워드로 검색해보세요."
        />
      );

    if ((!results || results.length === 0) && records && records.length > 0)
      return (
        <NotResult
          title="검색 결과가 없어요."
          subtitle="다양한 키워드로 검색해보세요."
        />
      );

    return <></>;
  };

  const onRefresh = useCallback(async (keyword: string) => {
    setRefresh(true);
    try {
      await handleSearch(keyword);
      getUsersFolderList();
      getEachCategoryCurationList(
        user.info?.categories[0].toLowerCase() as Category
      );
      setRefresh(false);
    } catch (err) {
      setTimeout(() => {
        setRefresh(false);
      }, 2000);
    }
  }, []);

  return (
    <Container
      COLOR={COLOR}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => onRefresh(keyword)}
        />
      }
    >
      <CotentsArea>
        <SearchBox
          onSubmitEditing={() => handleSearch(keyword)}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
        <Nothing />
        <ResultList results={results} />
        <RecentSearched />
        <RecommendKeyword handleRecommendKeyword={handleRecommendKeyword} />
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
