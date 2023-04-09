import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import styled from "styled-components/native";

const Divider = () => {
  const [COLOR, mode] = useThemeStyle();
  return <DividerContainer COLOR={COLOR} />;
};

const DividerContainer = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.COLOR.Neutral[10]};
  margin: 5px 0px;
`;

export default Divider;
