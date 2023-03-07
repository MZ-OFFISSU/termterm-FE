import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { Entypo } from "@expo/vector-icons";

interface Props extends TextInputProps {}

const SearchBox = ({ ...props }: Props) => {
  const [COLOR] = useThemeStyle();

  return (
    <Container COLOR={COLOR}>
      <Entypo name="magnifying-glass" size={24} color={COLOR.Text.muted} />
      <InnerTextInput COLOR={COLOR} {...props} />
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 44px;
  background-color: ${(props) => props.COLOR.Neutral[5]};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
`;

const InnerTextInput = styled.TextInput<{ COLOR: colorTheme }>`
  width: 95%;
  height: 44px;
  color: ${(props) => props.COLOR.Text.active};
  font-size: ${TEXT_STYLES.md2.Sb?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Sb?.fontWeight};
`;

export default SearchBox;
