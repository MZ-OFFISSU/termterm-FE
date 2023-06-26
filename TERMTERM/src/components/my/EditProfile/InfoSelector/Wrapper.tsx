import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

interface Props extends ViewProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * 타이틀 ~ 인풋을 감싸는 공통 래퍼
 */
const Wrapper = ({ title, subtitle, children, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container {...props}>
      <Title COLOR={COLOR}>{title}</Title>
      {subtitle ? <Subtitle COLOR={COLOR}>{subtitle}</Subtitle> : <></>}
      {children}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[1].Medium};
  color: ${(props) => props.COLOR.Text.active};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Medium};
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 5px;
`;

export default Wrapper;
