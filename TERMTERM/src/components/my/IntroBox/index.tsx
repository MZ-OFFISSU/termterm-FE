import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

interface Props extends ViewProps {
  title: string;
  subtitle: string;
}

/**
 * 자기 소개 박스
 */
const IntroBox = ({ title, subtitle, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <IntroBoxContainer
      COLOR={COLOR}
      style={{ borderWidth: 1, borderColor: COLOR.Background.onSurface }}
      {...props}
    >
      <Title COLOR={COLOR}>{title}</Title>
      <Subtitle COLOR={COLOR}>{subtitle}</Subtitle>
    </IntroBoxContainer>
  );
};

const IntroBoxContainer = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${(props) => props.COLOR.Background.surface};
  margin-top: 24px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Medium};
  color: ${(props) => props.COLOR.Text.active};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Regular};
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 8px;
  white-space: pre-line;
  line-height: 18px;
`;

export default IntroBox;
