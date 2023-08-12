import styled from "styled-components/native";
import { colorTheme, TEXT_STYLES, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  title: string;
}

const Button = ({ title, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container COLOR={COLOR} mode={mode} {...props}>
      <InnerBox>
        <BtnText COLOR={COLOR}>{title}</BtnText>
        <Entypo
          name="chevron-down"
          //TODO : size 해결
          size={TEXT_STYLES.md2.Sb?.fontSize}
          color={COLOR.Text.lighten}
        />
      </InnerBox>
    </Container>
  );
};

const Container = styled.TouchableOpacity<{ COLOR: colorTheme; mode: boolean }>`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.mode ? props.COLOR.Neutral[100] : props.COLOR.Neutral[10]};
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
  ${TYPO_STYLE.Body[2].SemiBold};
  margin-right: 8px;
`;

export default Button;
