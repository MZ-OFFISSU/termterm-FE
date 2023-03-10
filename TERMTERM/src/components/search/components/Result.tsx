import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { Ionicons } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";

interface Props extends TouchableOpacityProps {
  title: string;
  marked: boolean;
}

const Result = ({ title, marked, ...props }: Props) => {
  const [COLOR] = useThemeStyle();
  const [mode, setMode] = useRecoilState(themeState);

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
    props.mode ? props.COLOR.Background.inputBorderDefault : ""};
  background-color: ${(props) => props.COLOR.Background.input};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px;
  margin-top: 8px;
`;

const ResultTitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xsm.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.xsm.Md?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

export default Result;
