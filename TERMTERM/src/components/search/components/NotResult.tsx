import { TEXT_STYLES } from "@style/designSystem";
import { ViewProps } from "react-native";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";

interface Props extends ViewProps {
  title: string;
  subtitle: string;
}

const NotResult = ({ title, subtitle, ...props }: Props) => {
  const [COLOR] = useThemeStyle();
  return (
    <ResultBox {...props}>
      <Title COLOR={COLOR}>{title}</Title>
      <Subtitle COLOR={COLOR}>{subtitle}</Subtitle>
    </ResultBox>
  );
};

const ResultBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md1.Bd?.fontSize}px;
  font-weight: ${TEXT_STYLES.md1.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Reg?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Reg?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
  margin-top: 14px;
`;

export default NotResult;
