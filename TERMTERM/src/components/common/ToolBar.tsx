import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";
import { ViewProps } from "react-native";
import { colorTheme } from "@style/designSystem";

interface Props extends ViewProps {
  children: React.ReactNode;
}

/**
 * 툴바(바텀바) 컴포넌트
 */
const ToolBar = ({ children, ...props }: Props) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [COLOR] = useThemeStyle(theme);
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
  position: absolute;
  top: 0px;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

export default ToolBar;
