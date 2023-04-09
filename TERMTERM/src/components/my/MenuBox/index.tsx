import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";

interface Props extends TouchableOpacityProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

/**
 * 프로필에서 메뉴 하나하나 컴포넌트
 */
const MenuBox = ({ title, subtitle, children, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <MenuContainer {...props}>
      <Title
        style={{
          color: ["로그아웃", "탈퇴하기"].includes(title)
            ? COLOR.Text.muted
            : COLOR.Text.active,
        }}
      >
        {title}
      </Title>
      {subtitle ? <Subtitle COLOR={COLOR}>{subtitle}</Subtitle> : children}
    </MenuContainer>
  );
};

const MenuContainer = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: ${TEXT_STYLES.md2.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Md?.fontWeight};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Md?.fontWeight};
  color: ${(props) => props.COLOR.Text.default};
`;

export default MenuBox;
