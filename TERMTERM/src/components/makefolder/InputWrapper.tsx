import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import styled from "styled-components/native";
import { TextInputProps } from "react-native";
import { Input } from "..";

interface Props extends TextInputProps {
  subtitle: string;
  max: number;
  inevitable?: boolean;
  warning?: string;
}

const CustomInput = ({
  subtitle,
  value,
  max,
  inevitable,
  warning,
  ...props
}: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <InputWrapper>
      <Subtitle COLOR={COLOR}>{subtitle}</Subtitle>
      <Input
        value={value!}
        max={max}
        {...props}
        inevitable={inevitable}
        warning={warning}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: 18px;
  color: ${(props) => props.COLOR.Text.active};
  font-weight: 500;
`;

export default CustomInput;
