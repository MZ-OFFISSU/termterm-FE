import { BookmarkButtonComponent } from "@components/common/Bookmark";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useWordReg } from "@hooks/useWordReg";
import { TEXT_STYLES, colorTheme } from "@style/designSystem";
import { truncateString } from "@utils/wordCutter";
import styled from "styled-components/native";

interface Props {
  bookmarked: boolean;
  id: number;
  name: string;
  desc: string;
}

/**
 * 오늘의 용어 박스
 */
const DailyTermBox = ({ bookmarked, id, name, desc }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [sub, main] = useWordReg(name);

  return (
    <Container>
      <BookmarkButtonComponent dark={mode} fill={bookmarked} />
      <Title COLOR={COLOR}>{main}</Title>
      <Content COLOR={COLOR}>{truncateString(desc, 75)}</Content>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 18px 14px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xsm.Bd?.fontSize}px;
  font-weight: ${TEXT_STYLES.xsm.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
`;

const Content = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES["2xsm"].Reg?.fontSize}px;
  font-weight: ${TEXT_STYLES["2xsm"].Reg?.fontWeight};
  color: ${(props) => props.COLOR.Text.default};
  text-align: start;
  white-space: pre-line;
`;

export default DailyTermBox;
