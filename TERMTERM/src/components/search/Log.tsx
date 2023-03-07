import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { Feather } from "@expo/vector-icons";

interface Props extends TouchableOpacityProps {
  title: string;
}

const Log = ({ title, ...props }: Props) => {
  const [COLOR] = useThemeStyle();
  return (
    <LogBtn COLOR={COLOR} {...props}>
      <LogTitle COLOR={COLOR}>{title}</LogTitle>
      <Feather name="x" size={18} color={COLOR.Text.darken} />
    </LogBtn>
  );
};

const LogBtn = styled.TouchableOpacity<{ COLOR: colorTheme }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border-radius: 500px;
  border: 1px solid ${(props) => props.COLOR.Neutral[20]};
  margin: 0px 0px 7px 7px;
`;

const LogTitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xsm.Reg?.fontSize}px;
  font-weight: ${TEXT_STYLES.xsm.Reg?.fontWeight};
  color: ${(props) => props.COLOR.Text.darken};
  margin-right: 5px;
`;

export default Log;
