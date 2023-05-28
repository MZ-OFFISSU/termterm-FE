import styled from "styled-components/native";
import { TouchableOpacityProps, ActivityIndicator } from "react-native";
import {
  TEXT_STYLES,
  LIGHT_COLOR_STYLE,
  DARK_COLOR_STYLE,
} from "@style/designSystem";

export enum BUTTON_TYPE {
  primary,
  secondary,
}

export enum BUTTON_STATE {
  default,
  active,
  disabled,
  loading,
}

interface Props extends TouchableOpacityProps {
  title: string;
  theme: boolean;
  type: BUTTON_TYPE;
  state?: BUTTON_STATE;
}

const CustomButton = ({ title, theme, type, state, ...props }: Props) => {
  return (
    <ButtonBox {...props} type={type} state={state} theme={theme}>
      {state === BUTTON_STATE.loading ? (
        <ActivityIndicator
          size="small"
          color="#fffff"
          style={{ marginRight: 10 }}
        />
      ) : (
        <></>
      )}
      <ButtonTitle type={type} state={state} theme={theme}>
        {title}
      </ButtonTitle>
    </ButtonBox>
  );
};

const ButtonBox = styled.TouchableOpacity<{
  theme: boolean;
  type: BUTTON_TYPE;
  state?: BUTTON_STATE;
}>`
  height: 47px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.theme
      ? props.type === BUTTON_TYPE.primary
        ? props.state === BUTTON_STATE.active ||
          props.state === BUTTON_STATE.loading
          ? LIGHT_COLOR_STYLE.Neutral[100]
          : props.state === BUTTON_STATE.default
          ? LIGHT_COLOR_STYLE.Neutral[5]
          : props.state === BUTTON_STATE.disabled
          ? LIGHT_COLOR_STYLE.Neutral[20]
          : ""
        : props.state === BUTTON_STATE.default
        ? LIGHT_COLOR_STYLE.Background.surface
        : props.state === BUTTON_STATE.active
        ? LIGHT_COLOR_STYLE.THEME.secondary[120]
        : ""
      : props.type === BUTTON_TYPE.primary
      ? props.state === BUTTON_STATE.active ||
        props.state === BUTTON_STATE.loading
        ? DARK_COLOR_STYLE.THEME.primary[130]
        : props.state === BUTTON_STATE.default
        ? DARK_COLOR_STYLE.Neutral[0]
        : props.state === BUTTON_STATE.disabled
        ? DARK_COLOR_STYLE.Neutral[20]
        : ""
      : props.state === BUTTON_STATE.default
      ? DARK_COLOR_STYLE.Background.surface
      : props.state === BUTTON_STATE.active
      ? LIGHT_COLOR_STYLE.THEME.secondary[120]
      : ""};
`;

const ButtonTitle = styled.Text<{
  theme: boolean;
  type: BUTTON_TYPE;
  state?: BUTTON_STATE;
}>`
  font-size: ${TEXT_STYLES.md2.Sb?.fontSize}rem;
  font-weight: ${TEXT_STYLES.md2.Sb?.fontWeight};
  color: ${(props) =>
    props.theme
      ? props.type === BUTTON_TYPE.secondary
        ? LIGHT_COLOR_STYLE.Text.active
        : props.state === BUTTON_STATE.default
        ? LIGHT_COLOR_STYLE.Text.default
        : LIGHT_COLOR_STYLE.Text.lighten
      : props.type === BUTTON_TYPE.secondary &&
        props.state === BUTTON_STATE.active
      ? LIGHT_COLOR_STYLE.Text.active
      : LIGHT_COLOR_STYLE.Text.lighten};
`;

export default CustomButton;
