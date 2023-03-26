import styled from "styled-components/native";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  title: string;
}

const Button = ({ title, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container COLOR={COLOR} {...props}>
      <InnerBox>
        <BtnText COLOR={COLOR}>{title}</BtnText>
        <Entypo
          name="chevron-down"
          size={TEXT_STYLES.md2.Sb?.fontSize}
          color={COLOR.Text.lighten}
        />
      </InnerBox>
    </Container>
  );
};

const Container = styled.TouchableOpacity<{ COLOR: colorTheme }>`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  background-color: ${(props) => props.COLOR.Neutral[100]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BtnText = styled.Text<{ COLOR: colorTheme }>`
  color: ${(props) => props.COLOR.Text.lighten};
  font-size: ${TEXT_STYLES.md2.Sb?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Sb?.fontWeight};
  margin-right: 6px;
`;

export default Button;
