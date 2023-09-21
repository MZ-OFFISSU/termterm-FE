import React from "react";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { Text } from "react-native";
import CustomButton, {
  BUTTON_STATE,
  BUTTON_TYPE,
} from "@components/buttons/CustomButton";
import WalkthroughCarousel from "@components/terms/WalkthroughCarousel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Props = StackScreenProps<RootStackParamList, "Walkthrough">;
interface WtProps {
  title: string;
  children: React.ReactNode;
  image: any;
}

const Walkthrough = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  const goToHome = () => {
    navigation.reset({
      routes: [{ name: "Login", params: { nonAuto: false } }],
    });
  };

  const handleHideButton = async () => {
    await AsyncStorage.setItem("walkthrough", "hide");
    goToHome();
  };

  const checkHiden = async () => {
    const record = await AsyncStorage.getItem("walkthrough");
    if (record && record === "hide") goToHome();
  };

  useEffect(() => {
    checkHiden();
  }, []);

  return (
    <Wrapper>
      <WalkthroughCarousel walkthrough={walkthroughInfo} dots={true} />
      <ButtonWrapper>
        <CustomButton
          title="시작하기"
          theme={mode}
          type={BUTTON_TYPE.primary}
          state={BUTTON_STATE.active}
          onPress={goToHome}
          style={{ width: "90%" }}
        />
        <CustomButton
          title="다시 보지 않기"
          theme={mode}
          type={BUTTON_TYPE.primary}
          state={BUTTON_STATE.default}
          onPress={handleHideButton}
          style={{ width: "90%", marginTop: "3%" }}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${LIGHT_COLOR_STYLE.Background.surface};
  align-items: center;
  position: relative;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 5%;
  background-color: ${LIGHT_COLOR_STYLE.Background.surface};
`;

export default Walkthrough;

const walkthroughInfo: Array<WtProps> = [
  {
    title: "Daily Quiz",
    children: (
      <Text>
        <Text style={{ fontWeight: "900" }}>매일 용어 퀴즈</Text>를 풀고{"\n"}
        <Text style={{ fontWeight: "900" }}>모르는 용어는 복습</Text>해요
      </Text>
    ),
    image: require("../../assets/walkthrough/quiz.png"),
  },
  {
    title: "Archive",
    children: (
      <Text>
        중요하다고 생각하는{"\n"}
        <Text style={{ fontWeight: "900" }}>용어를 한 곳에서 모아</Text>볼 수
        있어요
      </Text>
    ),
    image: require("../../assets/walkthrough/archive.png"),
  },
  {
    title: "Curation",
    children: (
      <Text>
        <Text style={{ fontWeight: "900" }}>다양한 용어 큐레이션</Text>을 통해
        {"\n"}
        지금 내게 딱 필요한 용어를 보아요
      </Text>
    ),
    image: require("../../assets/walkthrough/curation.png"),
  },
  {
    title: "Point",
    children: (
      <Text>
        <Text style={{ fontWeight: "900" }}>차곡차곡 쌓이는 포인트</Text>로
        {"\n"}더 많은 혜택을 누릴 수 있어요
      </Text>
    ),
    image: require("../../assets/walkthrough/point.png"),
  },
];
