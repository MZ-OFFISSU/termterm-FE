import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

interface Props extends ViewProps {
  title: string;
  children: React.ReactNode;
}

/**
 * 타이틀 ~ 인풋을 감싸는 공통 래퍼
 */
const Wrapper = ({ title, children, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container {...props}>
      <Title COLOR={COLOR}>{title}</Title>
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
  font-size: ${TEXT_STYLES.md1.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.md1.Md?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

export default Wrapper;
