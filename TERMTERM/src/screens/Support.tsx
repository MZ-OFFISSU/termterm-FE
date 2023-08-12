import styled from "styled-components/native";
import { colorTheme, LIGHT_COLOR_STYLE } from "@style/designSystem";
import { First, Second, Third } from "./Support/index";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useState } from "react";
import { screenWidth } from "@style/dimensions";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useSafeColor } from "@hooks/useSafeColor";
import { useRecoilValue } from "recoil";
import { inquiryState } from "@recoil/inquiryState";
import InquiryApi from "@api/InquiryApi";
import { InquiryContent, InquiryType } from "Inquiry";

export type Props = StackScreenProps<RootStackParamList, "Support">;

const STAGES = [First, Second] as const;

const Support = ({ navigation }: Props) => {
  const inquiryInfo = useRecoilValue(inquiryState);
  const inquiryApi = new InquiryApi();

  const [COLOR, mode] = useThemeStyle();
  const [stage, setStage] = useState(0);
  const CurrentPage = STAGES[stage];
  useSafeColor();

  const onEnd = () => {
    stage < STAGES.length - 1
      ? setStage((prev) => prev + 1)
      : registerInquiry();
  };

  const registerInquiry = async () => {
    const basicInquiry: InquiryContent = {
      content: inquiryInfo.inquiryContent,
      email: inquiryInfo.email,
      type: inquiryInfo.inquiryType as InquiryType,
    };

    try {
      await inquiryApi.postInquiry(basicInquiry);
      // TODO : 네비게이션 경로 로직에 따라 변경
      console.log(basicInquiry);
      navigation.reset({ routes: [{ name: "Third" }] });
    } catch (err) {
      console.log(err);
      // TODO : 네비게이션 경로 로직에 따라 변경
      navigation.reset({ routes: [{ name: "Login" }] });
    }
  };

  return (
    <Wrapper COLOR={COLOR} mode={mode}>
      <Contents COLOR={COLOR} mode={mode}>
        <CurrentPage onEnd={onEnd} />
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled.ScrollView<{ COLOR: colorTheme; mode: boolean }>`
  display: flex;
  background-color: ${(props) => props.COLOR.Background.surface};
  position: relative;
`;

const Contents = styled.View<{ COLOR: colorTheme; mode: boolean }>`
  width: ${screenWidth}px;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

export default Support;
