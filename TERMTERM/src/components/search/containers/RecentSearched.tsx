import { ViewProps } from "react-native";
import {
  ContentsWrapper,
  ContentsHeader,
  LogWrapper,
  NotResult,
} from "@components/search";
import styled from "styled-components/native";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useSearch } from "@hooks/useSearch";
/**
 * 최근 검색 컨테이너 컴포넌트
 */
const RecentSearched = ({ ...props }: ViewProps) => {
  const [COLOR, mode] = useThemeStyle();
  const [records, setRecords] = useSearch();

  return (
    <ContentsWrapper {...props}>
      {records.length > 0 ? (
        <>
          <ContentsHeader title="최근 검색어">
            <RemoveButton onPress={() => setRecords([])}>
              <RemoveText COLOR={COLOR}>검색어 전체삭제</RemoveText>
            </RemoveButton>
          </ContentsHeader>
          <LogWrapper />
        </>
      ) : (
        <NotResult
          title="최근 검색어가 없어요."
          subtitle="다양한 키워드로 검색해보세요."
        />
      )}
    </ContentsWrapper>
  );
};

const RemoveButton = styled.TouchableOpacity``;

const RemoveText = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES["3xsm"].Md?.fontSize}px;
  font-weight: ${TEXT_STYLES["3xsm"].Md?.fontWeight};
  color: ${(props) => props.COLOR.Text.default};
`;

export default RecentSearched;
