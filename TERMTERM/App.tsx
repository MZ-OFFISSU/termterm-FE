import Container from "./Container";
import { RecoilRoot } from "recoil";
import Toast from "react-native-toast-message";
import { toastConfig } from "@components/popup/toast";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs([
    "Sending `onAnimatedValueUpdate` with no listeners registered.",
    "Warning: Each child in a list should have a unique",
  ]);
  return (
    <ActionSheetProvider>
      <RecoilRoot>
        <Container />
        <Toast position="top" topOffset={40} config={toastConfig} />
      </RecoilRoot>
    </ActionSheetProvider>
  );
}
