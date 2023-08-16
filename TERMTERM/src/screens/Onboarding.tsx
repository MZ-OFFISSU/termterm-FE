import styled from "styled-components/native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { First, Second, Third } from "./Onboarding/index";
import {
  NavigationBar,
  NavigatorTitle,
  NavigatorPager,
  CaretBtn,
} from "@components/index";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useState } from "react";
import { screenWidth } from "@style/dimensions";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useSafeColor } from "@hooks/useSafeColor";
import { useRecoilValue } from "recoil";
import { infoState } from "@recoil/signupState";
import MemberApi from "@api/MemberApi";
import { ModifiedMemberInfo } from "Member";
import { getTypeFromLabel } from "@utils/careerConverter";
import { registerFailed, registerSucceed } from "@utils/showToast";

export type Props = StackScreenProps<RootStackParamList, "Onboarding">;

const STAGES = [First, Second, Third] as const;

const Onboarding = ({ navigation }: Props) => {
  const info = useRecoilValue(infoState);
  const memberApi = new MemberApi();

  const [COLOR, mode] = useThemeStyle();
  const [stage, setStage] = useState(0);
  const CurrentPage = STAGES[stage];
  useSafeColor();

  const onEnd = (jobs?: string[]) => {
    stage < STAGES.length - 1
      ? setStage((prev) => prev + 1)
      : registerInfo(jobs);
  };

  const registerInfo = async (jobs?: string[]) => {
    const basicInfo: ModifiedMemberInfo = {
      domain: info.domain,
      introduction: "",
      job: info.job,
      nickname: info.name,
      yearCareer: getTypeFromLabel(info.career)!,
    };

    try {
      await memberApi.putInfo(basicInfo);
      console.log(jobs);
      await memberApi.putCategory(jobs!);

      registerSucceed();
      navigation.reset({ routes: [{ name: "ToolBar" }] });
    } catch (err) {
      console.log(err);
      registerFailed();
      navigation.reset({
        routes: [{ name: "Login", params: { nonAuto: true } }],
      });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 0, backgroundColor: COLOR.Background.surface }}
    >
      <Wrapper>
        <NavigationBar
          style={{
            paddingLeft: 17,
            paddingRight: 17,
            justifyContent: "space-between",
          }}
        >
          <CaretBtn></CaretBtn>
          <NavigatorTitle COLOR={COLOR}>회원가입</NavigatorTitle>
          <NavigatorPager style={{ color: COLOR.Text.active }} COLOR={COLOR}>
            {stage + 1} / 3
          </NavigatorPager>
        </NavigationBar>
        <Contents>
          <CurrentPage onEnd={onEnd} />
        </Contents>
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${LIGHT_COLOR_STYLE.Background.surface};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const Contents = styled.View`
  height: 100%;
  width: ${screenWidth - 64}px;
`;

export default Onboarding;
