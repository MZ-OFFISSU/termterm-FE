import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { useState } from "react";

interface Props extends TextInputProps {
  value: string;
}

/**
 * 커스텀 텍스트 인풋이지만, 온보딩 스크린에서만 사용됨
 * 이유는 온보딘 스크린에서는 라이트모드 고정이기에
 * 디자인 토큰을 유동적으로 적용하기가 어려움
 */
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
        value={value}
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
