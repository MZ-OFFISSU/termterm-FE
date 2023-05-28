import Container from "./Container";
import { RecoilRoot } from "recoil";
import Toast from "react-native-toast-message";
import { toastConfig } from "@components/popup/toast";

export default function App() {
  return (
    <RecoilRoot>
      <Container />
      <Toast position="top" topOffset={40} config={toastConfig} />
    </RecoilRoot>
  );
}
