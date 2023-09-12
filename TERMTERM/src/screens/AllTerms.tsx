import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useCallback, useEffect, useState } from "react";
import TermPreviewBox from "@components/curation/detail/term/TermPreviewBox";
import { TermConfig, TermItem } from "Term";
import { useTerm } from "@hooks/useTerm";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useFilter } from "@hooks/useFilter";

export type Props = StackScreenProps<RootStackParamList, "AllTerms">;

/**
 * 용어 전체페이지
 */
const AllTerms = ({ navigation }: Props) => {
  const { totalTermList, getAllTermList, page, initializePage } = useTerm();
  const [COLOR, mode] = useThemeStyle();
  const { filterArr, converter } = useFilter();

  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    const termConfig = filterArr.map((item) => converter(item));
    try {
      initializePage();
      getAllTermList({ categories: termConfig }, 0);
      setRefresh(false);
    } catch (err) {
      setTimeout(() => {
        setRefresh(false);
      }, 2000);
    }
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: COLOR.Background.surface,
    },
  });

  useEffect(() => {
    const termConfig = filterArr.map((item) => converter(item));
    getAllTermList({ categories: termConfig }, page);
  }, []);

  useEffect(() => {
    const termConfig = filterArr.map((item) => converter(item));
    initializePage();
    getAllTermList({ categories: termConfig }, 0);
  }, [filterArr]);

  return (
    <FlatList
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
      }
      data={totalTermList}
      renderItem={({ item }: { item: TermItem }) => (
        <TermPreviewBox {...item} />
      )}
      onEndReached={() => {
        const termConfig = filterArr.map((item) => converter(item));
        getAllTermList({ categories: termConfig }, page);
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

const Container = styled.FlatList<{ COLOR: colorTheme }>`
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
