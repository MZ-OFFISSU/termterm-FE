import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

interface Props extends TextInputProps {
  value?: string;
  max: number;
}

const CustomTextarea = ({ value, max, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Container>
      <Input
        COLOR={COLOR}
        multiline={true}
        value={value}
        style={{ textAlignVertical: "top", textAlign: "left" }}
        maxLength={max}
        placeholderTextColor={COLOR.Text.disabled}
        {...props}
      />
      <Maximum COLOR={COLOR}>{`${value?.length}/${max}`}</Maximum>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 18px;
`;

const Input = styled.TextInput<{ COLOR: colorTheme }>`
  width: 100%;
  min-height: 140px;
  border-radius: 6px;
  background-color: ${(props) => props.COLOR.Background.input};
  color: ${(props) => props.COLOR.Text.active};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  outline: none;
  border: none;
  text-align: left;
  ${TYPO_STYLE.Subheading[1].Regular};
`;

const Maximum = styled.Text<{ COLOR: colorTheme }>`
  font-size: 11px;
  font-weight: 400;
  color: ${(props) => props.COLOR.Text.muted};
  margin-top: 5px;
`;

export default CustomTextarea;
