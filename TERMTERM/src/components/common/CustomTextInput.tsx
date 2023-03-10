import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { useState } from "react";

interface Props extends TextInputProps {
  value: string;
}

const CustomTextInput = ({ value, ...props }: Props) => {
  const [borderColor, setBorderColor] = useState(LIGHT_COLOR_STYLE.Neutral[20]);

  return (
    <InputBox
      style={{
        borderBottomWidth: 1,
        borderBottomColor: borderColor,
      }}
    >
      <Input
        onFocus={() => setBorderColor(LIGHT_COLOR_STYLE.Neutral[100])}
        onBlur={() =>
          value === "" ? setBorderColor(LIGHT_COLOR_STYLE.Neutral[20]) : null
        }
        {...props}
      />
      <Maximum style={{ color: borderColor, right: 0, top: 7 }}>
        {value.length}/20
      </Maximum>
    </InputBox>
  );
};

const InputBox = styled.View`
  width: 100%;
  height: 25px;
  position: relative;
  margin-top: 10px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 100%;
  text-align: start;
  color: ${LIGHT_COLOR_STYLE.Text.active};
  margin-bottom: 2px;
`;

const Maximum = styled.Text`
  font-size: 11px;
  font-weight: 400;
  position: absolute;
`;

export default CustomTextInput;
