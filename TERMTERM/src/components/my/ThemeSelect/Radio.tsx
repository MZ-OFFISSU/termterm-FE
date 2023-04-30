import { useThemeStyle } from "@hooks/useThemeStyle";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { TEXT_STYLES, colorTheme } from "@style/designSystem";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  title: string;
  checked: boolean;
}

const Radio = ({ title, checked, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Container
      style={{ borderBottomWidth: 1, borderBottomColor: COLOR.Neutral[20] }}
      {...props}
    >
      {checked ? (
        <Ionicons name="radio-button-on" size={24} color={COLOR.Neutral[100]} />
      ) : (
        <Ionicons
          name="radio-button-off"
          size={24}
          color={COLOR.Neutral[100]}
        />
      )}
      <Title COLOR={COLOR}>{title}</Title>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 18px 20px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Md?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
  margin-left: 10px;
`;

export default Radio;
