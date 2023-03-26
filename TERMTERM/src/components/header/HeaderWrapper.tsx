import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { ViewProps } from "react-native";
import { colorTheme } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props extends ViewProps {
  children: React.ReactNode;
}

/**
 * 상단바 컴포넌트
 */
const HeaderWrapper = ({ children, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container COLOR={COLOR} mode={mode} {...props}>
        {children}
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View<{ COLOR: colorTheme; mode: boolean }>`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0px;
  background-color: ${(props) => props.COLOR.Background.surface};
  box-shadow: ${(props) =>
      props.mode ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)"}
    0px 1.5px 1.5px;
`;

export default HeaderWrapper;
