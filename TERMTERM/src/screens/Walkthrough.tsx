import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useEffect, useState } from "react";
import { screenWidth } from "@style/dimensions";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { LIGHT_COLOR_STYLE, colorTheme, TEXT_STYLES } from "@style/designSystem";
import { Text, Image, View, Button } from "react-native";
import AutoSizedImage from "@components/common/AutoSizedImage";
import CustomButton, { BUTTON_STATE, BUTTON_TYPE } from "@components/buttons/CustomButton";

export type Props = StackScreenProps<RootStackParamList, "Walkthrough">;

export type Part = {
  type: 'highlight' | 'normal';
  text: string;
};

const walkthroughInfo = [
  { 
    title: "Daily Quiz", 
    text: "매일 용어 퀴즈를 풀고\n모르는 용어는 복습해요",
    image: require("../../assets/walkthrough/quiz.png") 
  },
  { 
    title: "Archive", 
    text: "중요하다고 생각하는\n용어를 한 곳에서 모아볼 수 있어요", 
    image: require("../../assets/walkthrough/archive.png") 
  },
  { 
    title: "Curation", 
    text: "다양한 용어 큐레이션을 통해\n지금 내게 딱 필요한 용어를 보아요", 
    mage: require("../../assets/walkthrough/curation.png") 
  },
  { 
    title: "Point", 
    text: "차곡차곡 쌓이는 포인트로\n더 많은 혜택을 누릴 수 있어요", 
    image: require("../../assets/walkthrough/point.png") 
  },
];

const Walkthrough = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [step, setStep] = useState(0);
  const [width, setWidth] = useState(300);

  const nextStep = () => {
    if (step < walkthroughInfo.length - 1) {
      setStep(step + 1);
    } else {
      /** 마지막 스텝에서 Home으로 이동하도록 */
      navigation.navigate('Home');
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    // TODO : step 변경에 따른 처리 코드
  }, [step]);

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
  // TODO : 함수 디버깅 (폰트 bold 처리 로직 검토)
  const renderTextWithHighlight = (text: string): Part[] => {
    const pattern = /@head@(.*?)@tail@/g;
    const parts = text.split(pattern);
  
    return parts.map((part, index) => {
      if (part.startsWith('@head@') && part.endsWith('@tail@')) {
        const highlightedText = part.slice('@head@'.length, -'@tail@'.length);
        return {
          type: 'highlight',
          text: highlightedText,
        };
      } else {
        return {
          type: 'normal',
          text: part,
        };
      }
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 0, backgroundColor: COLOR.Background.surface }}
    >
      <Wrapper>
        <Title>{walkthroughInfo[step].title}</Title>
        {/* {renderTextWithHighlight(walkthroughInfo[step].text).map((part, index) => (
          <SubTitle key={index} type={part.type}>
            {part.text}
          </SubTitle>
        ))} */}
        <SubText>{walkthroughInfo[step].text}</SubText>
        <AutoSizedImage
          source={walkthroughInfo[step].image}
          width={width}
          style={{ marginTop: '8%' }}
        />
        <CustomButton
          title="시작하기"
          theme={mode}
          type={BUTTON_TYPE.primary}
          state={BUTTON_STATE.active}
          // TODO : Home으로 이동하도록 navigation 수정
          onPress={nextStep}
          style={{ width: '90%' }}
        />
        <CustomButton
          title="다시 보지 않기"
          theme={mode}
          type={BUTTON_TYPE.primary}
          state={BUTTON_STATE.default}
          // TODO : 다시 보지 않기 로직 추가
          onPress={previousStep}
          style={{ width: '90%', marginTop: '3%' }}
        />
      </Wrapper>
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

const Title = styled.Text`
  color: ${LIGHT_COLOR_STYLE.THEME.primary[130]};
  font-size: 21px;
  font-weight: 800;
  margin-top: 30px;
`;

const SubTitle = styled.Text<{ type: 'highlight' | 'normal' }>`
  color: ${LIGHT_COLOR_STYLE.Text.active};
  font-size: 24px;
  font-weight: ${(props) => (props.type === 'highlight' ? '900' : '400')};
  text-align: center;
  line-height: 40px;
`;

const SubText = styled.Text`
  color: ${LIGHT_COLOR_STYLE.Text.active};
  font-size: 24px;
  font-weight: 500;
  color: ${LIGHT_COLOR_STYLE.Text.active};
  text-align: center;
  margin: 30px 0;
  line-height: 30px;
`;

export default Walkthrough;