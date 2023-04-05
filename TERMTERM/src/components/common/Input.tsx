import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";

interface Props extends TextInputProps {
  value: string;
  max: number;
  inevitable?: boolean;
}

/**
 * 온보딩 스크린 외의 스크린에서 사용되는 커스텀 텍스트 인풋
 */
const CustomInput = ({ value, max, inevitable, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [borderColor, setBorderColor] = useState("");
  //한번 클릭했다가 떼었는가
  const [blured, setBlured] = useState(false);

  useEffect(() => {
    setBorderColor(COLOR.Neutral[20]);
  }, [COLOR]);

  return (
    <>
      <InputBox
        style={{
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
        }}
      >
        <Input
          onFocus={() => setBorderColor(COLOR.Neutral[100])}
          onBlur={() => {
            value === "" ? setBorderColor(COLOR.Neutral[20]) : null;
            setBlured(true);
          }}
          COLOR={COLOR}
          maxLength={max}
          placeholderTextColor={COLOR.Text.disabled}
          {...props}
        />
        <Maximum style={{ color: borderColor, right: 0, top: 7 }}>
          {value.length}/{max}
        </Maximum>
      </InputBox>
      {inevitable && blured && value === "" ? (
        <Warning>필수로 입력해주세요.</Warning>
      ) : (
        <></>
      )}
    </>
  );
};

const InputBox = styled.View`
  width: 100%;
  height: 25px;
  position: relative;
  margin-top: 10px;
`;

const Input = styled.TextInput<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  text-align: start;
  color: ${(props) => props.COLOR.Text.active};
  margin-bottom: 2px;
`;

const Maximum = styled.Text`
  font-size: 11px;
  font-weight: 400;
  position: absolute;
`;

const Warning = styled.Text`
  font-size: 10px;
  font-weight: 400;
  color: #ff4954;
  margin-top: 5px;
`;

export default CustomInput;
