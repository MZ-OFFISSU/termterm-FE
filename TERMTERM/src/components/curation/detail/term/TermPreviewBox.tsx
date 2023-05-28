import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { PreviewBookmark } from "@components/common/Bookmark";
import { Ionicons } from "@expo/vector-icons";
import { truncateString } from "@utils/wordCutter";
import { useWordReg } from "@hooks/useWordReg";

interface Props extends TouchableOpacityProps {
  name: string;
  description: string;
  bookmarked: boolean;
}

/**
 * 용어 미리보기 박스
 */
const TermPreviewBox = ({ name, description, bookmarked, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [sub, main] = useWordReg(name);

  return (
    <Container
      style={{
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: COLOR.Neutral[5],
        borderTopColor: COLOR.Neutral[5],
        marginBottom: 5,
      }}
      {...props}
    >
      <UpperBox>
        <Job COLOR={COLOR}>{main}</Job>
        <PreviewBookmark>
          {bookmarked ? (
            <Ionicons
              name="ios-bookmark"
              size={22}
              color={COLOR.THEME.secondary[130]}
            />
          ) : (
            <Ionicons
              name="ios-bookmark-outline"
              size={22}
              color={COLOR.Neutral[20]}
            />
          )}
        </PreviewBookmark>
      </UpperBox>
      <Description COLOR={COLOR}>{truncateString(description, 60)}</Description>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 120px;
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UpperBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Job = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Bd?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

const Description = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xsm.Reg?.fontSize}px;
  font-weight: ${TEXT_STYLES.xsm.Reg?.fontWeight};
  line-height: ${TEXT_STYLES.xsm.Reg?.fontSize! + 5}px;
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 10px;
  white-space: pre-line;
`;

export default TermPreviewBox;
