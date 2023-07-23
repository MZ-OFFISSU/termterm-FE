import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { AntDesign } from "@expo/vector-icons";

interface Props extends TextInputProps {}

const SearchBox = ({ ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container COLOR={COLOR} mode={mode}>
      <AntDesign name="search1" size={24} color={COLOR.Text.muted} />
      <InnerTextInput
        COLOR={COLOR}
        {...props}
        placeholder="검색어를 입력해주세요."
        returnKeyType="done"
        placeholderTextColor={COLOR.Text.muted}
      />
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme; mode: boolean }>`
  width: 100%;
  height: 44px;
  background-color: ${(props) =>
    props.mode ? props.COLOR.Neutral[5] : props.COLOR.Background.input};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
  border-radius: 6px;
  overflow: hidden;
`;

const InnerTextInput = styled.TextInput<{ COLOR: colorTheme }>`
  width: 90%;
  height: 44px;
  color: ${(props) => props.COLOR.Text.active};
  ${TYPO_STYLE.Body[2].Medium};
  margin-left: 8px;
`;

export default SearchBox;
