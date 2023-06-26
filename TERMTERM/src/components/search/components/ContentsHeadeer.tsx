import styled from "styled-components/native";
import { TextProps } from "react-native";
import { TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";

interface Props extends TextProps {
  title: string;
  children?: React.ReactNode;
}

const ContentsHeader = ({ title, children, ...props }: Props) => {
  const [COLOR] = useThemeStyle();
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
  ${TYPO_STYLE.Body[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
`;

export default ContentsHeader;
