import { TYPO_STYLE } from "@style/designSystem";
import { ViewProps } from "react-native";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";

interface Props extends ViewProps {
  title: string;
  subtitle: string;
}

const NotResult = ({ title, subtitle, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
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
  margin: 50px 0px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[2].Regular};
  color: ${(props) => props.COLOR.Text.active};
  margin-top: 14px;
`;

export default NotResult;
