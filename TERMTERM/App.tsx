import Container from "./Container";
import { RecoilRoot } from "recoil";
import Toast from "react-native-toast-message";
import { toastConfig } from "@components/popup/toast";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { LogBox } from "react-native";
import { useNotification } from "@hooks/useNotification";
import { useEffect } from "react";

export default function App() {
  LogBox.ignoreLogs([
    "Sending `onAnimatedValueUpdate` with no listeners registered.",
    "Warning: Each child in a list should have a unique",
    "Warning: Encountered two children with the same key",
  ]);
  const { requestPermission, scheduleNotification } = useNotification();

  useEffect(() => {
    requestPermission();
    scheduleNotification(8, 30);
    scheduleNotification(19, 0);
  }, []);
  return (
    <ActionSheetProvider>
      <RecoilRoot>
        <Container />
        <Toast position="top" topOffset={40} config={toastConfig} />
      </RecoilRoot>
    </ActionSheetProvider>
  );
}
