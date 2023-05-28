import styled from "styled-components/native";
import { TextProps } from "react-native";
import { TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";

interface Props extends TextProps {
  title: string;
  children?: React.ReactNode;
}

const ContentsHeader = ({ title, children, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <HeaderContainer {...props}>
      <Title COLOR={COLOR}>{title}</Title>
      {children ? children : <></>}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md1.Bd?.fontSize}rem;
  font-weight: ${TEXT_STYLES.md1.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

export default ContentsHeader;
