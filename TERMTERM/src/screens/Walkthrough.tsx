import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useEffect, useState } from "react";
import { screenHeight, screenWidth } from "@style/dimensions";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { Text } from "react-native";
import CustomButton, {
  BUTTON_STATE,
  BUTTON_TYPE,
} from "@components/buttons/CustomButton";
import WalkthroughCarousel from "@components/terms/WalkthroughCarousel";

export type Props = StackScreenProps<RootStackParamList, "Walkthrough">;
interface WtProps {
  title: string;
  children: React.ReactNode;
  image: any;
}

const Walkthrough = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [walkthough, setWalkthrough] = useState<Array<WtProps> | null>();
  const [width, setWidth] = useState(300);

  useEffect(() => {
    setWalkthrough(walkthroughInfo);
  }, []);

  /** 아이콘 너비 계산 함수 */
  const calcWidth = () => {
    if (screenWidth < 390) return;
    if (screenWidth < 435) {
      setWidth(340);
      return;
    }
    if (screenWidth < 500) {
      setWidth(380);
      return;
    }
    if (screenWidth > 500) {
      setWidth(420);
      return;
    }
  };
  useEffect(() => {
    calcWidth();
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
          // TODO : Home으로 이동하도록 navigation 수정
          onPress={() => navigation.push("Home")}
          style={{ width: "90%" }}
        />
        <CustomButton
          title="다시 보지 않기"
          theme={mode}
          type={BUTTON_TYPE.primary}
          state={BUTTON_STATE.default}
          // TODO : 다시 보지 않기 로직 추가
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
  bottom: 10%;
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