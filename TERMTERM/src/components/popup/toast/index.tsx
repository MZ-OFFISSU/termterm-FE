import AutoSizedImage from "@components/common/AutoSizedImage";
import { LIGHT_COLOR_STYLE, TEXT_STYLES } from "@style/designSystem";
import {
  BaseToast,
  ErrorToast,
  BaseToastProps,
  ToastProps,
} from "react-native-toast-message";
import styled from "styled-components/native";

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  light: ({ text1 }: BaseToastProps) => (
    <ToastContainer
      style={{
        backgroundColor: LIGHT_COLOR_STYLE.THEME.secondary[20],
        borderWidth: 1,
        borderColor: LIGHT_COLOR_STYLE.THEME.secondary[40],
      }}
    >
      <AutoSizedImage
        source={require("@assets/icon/toast-light.png")}
        width={36}
      />
      <ToastMessage style={{ color: "#0D0D0D" }}>{text1}</ToastMessage>
    </ToastContainer>
  ),

  dark: ({ text1 }: BaseToastProps) => (
    <ToastContainer
      style={{
        backgroundColor: "#46494bee",
        borderWidth: 1,
        borderColor: LIGHT_COLOR_STYLE.Background.inputBorderFocus,
      }}
    >
      <AutoSizedImage
        source={require("@assets/icon/toast-dark.png")}
        width={36}
      />
      <ToastMessage style={{ color: "#FFFFFF" }}>{text1}</ToastMessage>
    </ToastContainer>
  ),
};

const ToastContainer = styled.View`
  width: 90%;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  padding: 0px 20px;
`;

const ToastMessage = styled.Text`
  font-size: ${TEXT_STYLES.md2.Bd?.fontSize}rem;
  font-weight: ${TEXT_STYLES.md2.Bd?.fontWeight};
  white-space: pre-line;
  margin-left: 20px;
`;
