import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { Ionicons } from "@expo/vector-icons";

interface Props extends TouchableOpacityProps {
  title: string;
  marked: boolean;
}

/**
 * 검색 결과 -> 용어
 * 북마크 폴더 안 -> 용어
 */
const TermBox = ({ title, marked, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <ResultBtn COLOR={COLOR} mode={mode} {...props}>
      <ResultTitle COLOR={COLOR}>{title}</ResultTitle>
      {marked ? (
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
    </ResultBtn>
  );
};

const ResultBtn = styled.TouchableOpacity<{ COLOR: colorTheme; mode: boolean }>`
  min-width: 165px;
  width: 49%;
  height: 70px;
  border-radius: 10px;
  border: ${(props) =>
    props.mode ? props.COLOR.Background.inputBorderDefault : "none"};
  background-color: ${(props) => props.COLOR.Background.input};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px;
  margin-top: 8px;
`;

const ResultTitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Medium};
  color: ${(props) => props.COLOR.Text.active};
`;

export default TermBox;
