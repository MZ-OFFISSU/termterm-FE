import Container from "./Container";
import { RecoilRoot } from "recoil";
import Toast from "react-native-toast-message";
import { toastConfig } from "@components/popup/toast";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function App() {
  return (
    <ActionSheetProvider>
      <RecoilRoot>
        <Container />
        <Toast position="top" topOffset={40} config={toastConfig} />
      </RecoilRoot>
    </ActionSheetProvider>
  );
}
