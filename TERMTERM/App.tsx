import Container from "./Container";
import { RecoilRoot } from "recoil";
import Toast from "react-native-toast-message";
import { toastConfig } from "@components/popup/toast";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { LogBox } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotification } from "@hooks/useNotification";

export default function App() {
  LogBox.ignoreLogs([
    "Sending `onAnimatedValueUpdate` with no listeners registered.",
    "Warning: Each child in a list should have a unique",
    "Warning: Encountered two children with the same key",
  ]);

  const [notificationStatus, setNotificationStatus] = useState<string | null>(
    null
  );
  const { requestPermission, scheduleNotification } = useNotification();

  const setNotification = async () => {
    const noti = await AsyncStorage.getItem("noti_allow");
    setNotificationStatus(noti);

    if (!noti) {
      const per = await requestPermission();
      await AsyncStorage.setItem("noti_allow", per ? "allow" : "deny");
      if (per) {
        scheduleNotification(8, 30);
        scheduleNotification(19, 0);
      }
    }
  };

  useEffect(() => {
    setNotification();
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
