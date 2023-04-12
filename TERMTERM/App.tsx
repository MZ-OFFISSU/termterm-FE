import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import * as Font from "expo-font";
import { View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Container from "./Container";
import { RecoilRoot } from "recoil";
import Toast from "react-native-toast-message";
import { toastConfig } from "@components/popup/toast";
// import BottomSheet from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const getFonts = async () => {
    await Font.loadAsync({
      SUIT: require("./assets/fonts/SUIT-Variable.ttf"),
    });
  };

  useEffect(() => {
    async function prepare() {
      try {
        getFonts();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // 렌더링 사전준비 완료
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      //로딩 이후 스플래시 화면 숨김
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

      /** BottomSheet 관련 내용 */
      /** ref */
      // const bottomSheetRef = useRef<BottomSheet>(null);
      // /** variables */
      // const snapPoints = useMemo(() => ['25%', '50%'], []);
      // /** callBack */
      // const handleSheetChanges = useCallback((index: number) => {
      //     console.log('handleSheetChanges', index);
      // }, []);

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1, width: "100%" }}>
      <RecoilRoot>
        <Container />
      </RecoilRoot>
      <Toast position="top" topOffset={40} config={toastConfig} />
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
          <View>
              <Text>Awesome 🎉</Text>
          </View>
      </BottomSheet> */}
    </View>
  );
}
