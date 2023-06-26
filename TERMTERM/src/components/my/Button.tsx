import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

interface Props extends TouchableOpacityProps {
  title: string;
  isActivated: boolean;
}

/**
 * 프로필 스크린에서 사용되는 버튼 컴포넌트
 */
const Button = ({ title, isActivated, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <ButtonContainer
      COLOR={COLOR}
      mode={mode}
      isActivated={isActivated}
      {...props}
    >
      <ButtonTitle COLOR={COLOR} isActivated={isActivated} mode={mode}>
        {title}
      </ButtonTitle>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity<{
  COLOR: colorTheme;
  mode: boolean;
  isActivated: boolean;
}>`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isActivated
      ? props.mode
        ? props.COLOR.Neutral[100]
        : props.COLOR.THEME.primary[130]
      : props.COLOR.Background.onSurface};
`;

const ButtonTitle = styled.Text<{
  COLOR: colorTheme;
  isActivated: boolean;
  mode: boolean;
}>`
  ${(props) =>
    props.isActivated
      ? TYPO_STYLE.Body[2].SemiBold
      : TYPO_STYLE.Subheading[1].Medium};
  color: ${(props) =>
    props.mode && props.isActivated
      ? props.COLOR.Text.lighten
      : props.COLOR.Text.default};
`;

export default Button;
