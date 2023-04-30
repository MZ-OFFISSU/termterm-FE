import { useThemeStyle } from "@hooks/useThemeStyle";
import { TEXT_STYLES, colorTheme } from "@style/designSystem";
import { Switch, SwitchProps } from "react-native";
import styled from "styled-components/native";

interface Props extends SwitchProps {
  title: string;
}

/**
 * 알람설정 탭에서 한 줄
 */
const ContentLine = ({ title, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Container
      style={{ borderBottomWidth: 1, borderBottomColor: COLOR.Neutral[20] }}
    >
      <Title COLOR={COLOR}>{title}</Title>
      <Switch
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        trackColor={{ false: "#ffffff", true: COLOR.THEME.primary[130] }}
        ios_backgroundColor="#ffffff"
        {...props}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 25px 20px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Md?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

export default ContentLine;
