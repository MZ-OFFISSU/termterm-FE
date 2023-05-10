import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useEffect, useState } from "react";
import { screenWidth } from "@style/dimensions";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { LIGHT_COLOR_STYLE, colorTheme } from "@style/designSystem";
import { ScrollView, Text, Image, View } from "react-native";
import AutoSizedImage from "@components/common/AutoSizedImage";
import CustomButton, { BUTTON_STATE, BUTTON_TYPE } from "@components/buttons/CustomButton";

export type Props = StackScreenProps<RootStackParamList, "Walkthrough">;

const walkthroughInfo = [
  { 
    title: "Daily Quiz", 
    text: "@@매일 용어 퀴즈@@를 풀고\n@@모르는 용어는 복습@@해요",
    image: require("../../assets/walkthrough/quiz.png") 
  },
  { 
    title: "Archive", 
    text: "중요하다고 생각하는\n@@용어를 한 곳에서 모아@@볼 수 있어요", 
    image: require("../../assets/walkthrough/archive.png") 
  },
  { 
    title: "Curation", 
    text: "@@다양한 용어 큐레이션@@을 통해\n지금 내게 딱 필요한 용어를 보아요", 
    mage: require("../../assets/walkthrough/curation.png") 
  },
  { 
    title: "Point", 
    text: "@@차곡차곡 쌓이는 포인트@@로\n더 많은 혜택을 누릴 수 있어요", 
    image: require("../../assets/walkthrough/point.png") 
  },
];

const Walkthrough = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [step, setStep] = useState(0);
  const [width, setWidth] = useState(300);

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

  /** bold 처리가 필요한 텍스트를 선별하는 함수 */
  const renderTextWithHighlight = (text: string) => {
    const pattern = /@@(.+?)@@/g;
    const parts = text.split(pattern);

    return parts.map((part, index) => {
      if (part.startsWith("@@") && part.endsWith("@@")) {
        return (
          <Text key={index} style={{ fontWeight: "900" }}>
            {part.slice(1, -1)}
          </Text>
        );
      } else {
        return <Text key={index}>{part}</Text>;
      }
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 0, backgroundColor: COLOR.Background.surface }}
    >
      <Wrapper>
        <Title>{walkthroughInfo[step].title}</Title>
        <SubTitle>{renderTextWithHighlight(walkthroughInfo[step].text)}</SubTitle>
        <AutoSizedImage
          source={walkthroughInfo[step].image}
          width={width}
          style={{ marginTop: '15%' }}
        />
      </Wrapper>
      <CustomButton
        title="시작하기"
        theme={mode}
        type={BUTTON_TYPE.primary}
        state={BUTTON_STATE.active}
      />
      <CustomButton
        title="다시 보기 않기"
        theme={mode}
        type={BUTTON_TYPE.primary}
        state={BUTTON_STATE.default}
      />
    </SafeAreaView>
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

const Contents = styled.View`
  height: 100%;
  display: flex;
  width: ${screenWidth - 64}px;
`;

const Title = styled.Text`
  color: ${LIGHT_COLOR_STYLE.THEME.primary[130]};
  font-size: 21px;
  font-weight: 800;
  margin-top: 30px;
`;

const SubTitle = styled.Text`
  color: ${LIGHT_COLOR_STYLE.Text.active};
  font-size: 24px;
  font-weight: normal;
  text-align: center;
  margin-top: 30px;
  line-height: 40px;
`;

export default Walkthrough;