import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useState } from "react";
import { useThemeStyle } from "@hooks/useThemeStyle";

interface Props extends TextInputProps {
  value: string;
}

/**
 * 문의하기 이메일 입력에 사용될 인풋 박스
 */
const CustomEmailInput = ({ value, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [borderColor, setBorderColor] = useState(COLOR.Neutral[20]);

  return (
    <InputBox
      COLOR={COLOR}
      mode={mode}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: borderColor,
      }}
    >
      <Input
        onFocus={() => setBorderColor(COLOR.Neutral[100])}
        onBlur={() =>
          setBorderColor(value === "" ? COLOR.Neutral[20] : COLOR.Neutral[100])
        }
        value={value}
        placeholderTextColor={COLOR.Text.disabled}
        COLOR={COLOR}
        {...props}
      />
    </InputBox>
  );
};

const InputBox = styled.View<{ COLOR: colorTheme; mode: boolean }>`
  width: 100%;
  height: 25px;
  position: relative;
  color: ${(props) => props.COLOR.Text.active};
  margin-top: 10px;
`;

const Input = styled.TextInput<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Regular};
  width: 100%;
  height: 100%;
  text-align: left;
  color: ${(props) => props.COLOR.Text.active};
  margin-bottom: 2px;
`;

export default CustomEmailInput;
