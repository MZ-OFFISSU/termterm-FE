import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  ready: boolean;
  position: number;
}

const CompleteButton = ({ ready, position, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <ButtonBox
      COLOR={COLOR}
      position={position}
      style={{
        backgroundColor: mode
          ? ready
            ? COLOR.Neutral[100]
            : COLOR.Neutral[5]
          : ready
          ? COLOR.THEME.primary[130]
          : COLOR.Neutral[0],
      }}
      {...props}
    >
      <ButtonContent COLOR={COLOR} ready={ready}>
        완료
      </ButtonContent>
    </ButtonBox>
  );
};

const ButtonBox = styled.TouchableOpacity<{
  COLOR: colorTheme;
  position: number;
}>`
  width: 100%;
  height: 47px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: ${(props) => props.position}px;
`;

const ButtonContent = styled.Text<{ COLOR: colorTheme; ready: boolean }>`
  font-size: ${TEXT_STYLES.md2.Sb?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Sb?.fontWeight};
  color: ${(props) =>
    props.ready ? props.COLOR.Text.lighten : props.COLOR.Text.default};
`;

export default CompleteButton;
