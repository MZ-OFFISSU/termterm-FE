import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { ViewProps } from "react-native";
import { colorTheme } from "@style/designSystem";

interface Props extends ViewProps {
  children: React.ReactNode;
}

/**
 * 상단바 컴포넌트
 */
const HeaderWrapper = ({ children, ...props }: Props) => {
  const [COLOR] = useThemeStyle();
  return (
    <Container COLOR={COLOR} {...props}>
      {children}
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0px;
  background-color: ${(props) => props.COLOR.Background.surface};
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 3px;
`;

export default HeaderWrapper;
