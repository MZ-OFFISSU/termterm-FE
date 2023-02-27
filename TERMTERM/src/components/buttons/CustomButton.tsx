import styled from "styled-components/native";
import { TouchableOpacityProps, ActivityIndicator } from "react-native";
import { TEXT_STYLES, LIGHT_COLOR_STYLE } from "@style/designSystem";

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
  type: BUTTON_TYPE;
  state?: BUTTON_STATE;
}

const CustomButton = ({ title, type, state, ...props }: Props) => {
  return (
    <ButtonBox {...props} type={type} state={state}>
      {state === BUTTON_STATE.loading ? (
        <ActivityIndicator
          size="small"
          color="#fffff"
          style={{ marginRight: 10 }}
        />
      ) : (
        <></>
      )}
      <ButtonTitle type={type} state={state}>
        {title}
      </ButtonTitle>
    </ButtonBox>
  );
};

const ButtonBox = styled.TouchableOpacity<{
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
    props.type === BUTTON_TYPE.primary
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
      : ""};
`;

const ButtonTitle = styled.Text<{
  type: BUTTON_TYPE;
  state?: BUTTON_STATE;
}>`
  font-size: ${TEXT_STYLES.md2.Sb?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Sb?.fontWeight};
  color: ${(props) =>
    props.type === BUTTON_TYPE.secondary
      ? LIGHT_COLOR_STYLE.Text.active
      : props.state === BUTTON_STATE.default
      ? LIGHT_COLOR_STYLE.Text.default
      : LIGHT_COLOR_STYLE.Text.lighten};
`;

export default CustomButton;
