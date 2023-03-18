import { TEXT_STYLES } from "@style/designSystem";
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
    <ToastContainer style={{ backgroundColor: "#F0F0F1" }}>
      <ToastMessage style={{ color: "#0D0D0D" }}>{text1}</ToastMessage>
    </ToastContainer>
  ),

  dark: ({ text1 }: BaseToastProps) => (
    <ToastContainer style={{ backgroundColor: "#46494B" }}>
      <ToastMessage style={{ color: "#FFFFFF" }}>{text1}</ToastMessage>
    </ToastContainer>
  ),
};

const ToastContainer = styled.View`
  width: 90%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const ToastMessage = styled.Text`
  font-size: ${TEXT_STYLES.md2.Bd?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Bd?.fontWeight};
`;
