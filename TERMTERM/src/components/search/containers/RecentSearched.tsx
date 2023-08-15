import { ViewProps } from "react-native";
import {
  ContentsWrapper,
  ContentsHeader,
  LogWrapper,
  NotResult,
} from "@components/search";
import styled from "styled-components/native";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useSearch } from "@hooks/useSearch";
/**
 * 최근 검색 컨테이너 컴포넌트
 */
const RecentSearched = ({ ...props }: ViewProps) => {
  const [COLOR, mode] = useThemeStyle();
  const [records, setRecords] = useSearch();

  return records.length > 0 ? (
    <ContentsWrapper {...props}>
      <ContentsHeader title="최근 검색어">
        <RemoveButton onPress={() => setRecords([])}>
          <RemoveText COLOR={COLOR}>검색어 전체삭제</RemoveText>
        </RemoveButton>
      </ContentsHeader>
      <LogWrapper />
    </ContentsWrapper>
  ) : (
    <></>
  );
};

const RemoveButton = styled.TouchableOpacity``;

const RemoveText = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[2].Medium};
  color: ${(props) => props.COLOR.Text.default};
`;

export default RecentSearched;
