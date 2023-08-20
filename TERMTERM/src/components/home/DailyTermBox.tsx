import { BookmarkButtonComponent } from "@components/common/Bookmark";
import { Preview } from "@components/curation/detail/term";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useWordReg } from "@hooks/useWordReg";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TEXT_STYLES, colorTheme, TYPO_STYLE } from "@style/designSystem";
import { truncateString } from "@utils/wordCutter";
import { useState } from "react";
import styled from "styled-components/native";

/**
 * 오늘의 용어 박스
 */
const DailyTermBox = ({ bookmarked, id, name, description }: Preview) => {
  const [COLOR, mode] = useThemeStyle();
  const [sub, main] = useWordReg(name);
  const [bookmarkState, setBookmarkState] = useState(bookmarked);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Container
      style={{ borderWidth: 1, borderColor: COLOR.Background.onSurface }}
      onPress={() => navigation.push("TermDetail", { id: id })}
    >
      <BookmarkButtonComponent fill={bookmarked === "YES" ? true : false} />
      <Title COLOR={COLOR} mode={mode}>
        {main}
      </Title>
      <Content COLOR={COLOR}>{truncateString(description, 75)}</Content>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  min-width: 165px;
  width: 49%;
  height: 205px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 14px;
  margin-top: 8px;
`;

const Title = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Subheading[1].Bold};
  color: ${(props) =>
    props.mode ? props.COLOR.Text.active : props.COLOR.THEME.primary[100]};
  text-align: center;
`;

const Content = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Regular};
  //TODO : line-height 수정
  line-height: ${TEXT_STYLES["2xsm"].Reg?.fontSize! + 3}px;
  color: ${(props) => props.COLOR.Text.default};
  text-align: start;
  white-space: pre-line;
`;

export default DailyTermBox;
