import styled, { css } from "styled-components/native";
import { TouchableOpacityProps, ActivityIndicator } from "react-native";
import {
  LIGHT_COLOR_STYLE,
  DARK_COLOR_STYLE,
  TYPO_STYLE,
} from "@style/designSystem";

export enum BUTTON_TYPE {
  primary,
  secondary,
  tertiary,
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
    <ButtonBox {...props} type={type} state={state} mode={theme}>
      {state === BUTTON_STATE.loading ? (
        <ActivityIndicator
          size="small"
          color="#fffff"
          style={{ marginRight: 10 }}
        />
      ) : (
        <></>
      )}
      <ButtonTitle type={type} state={state} mode={theme}>
        {title}
      </ButtonTitle>
    </ButtonBox>
  );
};

const ButtonBox = styled.TouchableOpacity<{
  mode: boolean;
  type: BUTTON_TYPE;
  state?: BUTTON_STATE;
}>`
  height: 47px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${(props) => {
    switch (props.type) {
      case BUTTON_TYPE.primary: {
        if (props.mode) {
          switch (props.state) {
            case BUTTON_STATE.active:
            case BUTTON_STATE.loading:
              return css`
                background-color: ${LIGHT_COLOR_STYLE.Neutral[100]};
              `;
            case BUTTON_STATE.default:
              return css`
                background-color: ${LIGHT_COLOR_STYLE.Neutral[5]};
              `;
            case BUTTON_STATE.disabled:
              return css`
                background-color: ${LIGHT_COLOR_STYLE.Neutral[20]};
              `;
          }
        } else {
          switch (props.state) {
            case BUTTON_STATE.active:
            case BUTTON_STATE.loading:
              return css`
                background-color: ${DARK_COLOR_STYLE.THEME.primary[130]};
              `;
            case BUTTON_STATE.default:
              return css`
                background-color: ${DARK_COLOR_STYLE.Neutral[0]};
              `;
            case BUTTON_STATE.disabled:
              return css`
                background-color: ${DARK_COLOR_STYLE.Neutral[20]};
              `;
          }
        }
        break;
      }
      default: {
        if (props.mode) {
          switch (props.state) {
            case BUTTON_STATE.default:
              return css`
                background-color: ${LIGHT_COLOR_STYLE.Background.surface};
              `;
            case BUTTON_STATE.active:
              return css`
                background-color: ${LIGHT_COLOR_STYLE.THEME.secondary[120]};
              `;
          }
        } else {
          switch (props.state) {
            case BUTTON_STATE.default:
              return css`
                background-color: ${DARK_COLOR_STYLE.Background.surface};
              `;
            case BUTTON_STATE.active:
              return css`
                background-color: ${LIGHT_COLOR_STYLE.THEME.secondary[120]};
              `;
          }
        }
        break;
      }
    }
  }}
`;

const ButtonTitle = styled.Text<{
  mode: boolean;
  type: BUTTON_TYPE;
  state?: BUTTON_STATE;
}>`
  ${TYPO_STYLE.Body[2].SemiBold};
  color: ${(props) =>
    props.mode
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
