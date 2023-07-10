import { useThemeStyle } from "@hooks/useThemeStyle";
import {
  ApplyProps,
  Content,
  ContentBox,
  ContentCaption,
  ContentTitle,
  Title,
  TitleObjet,
  TitleWrapper,
  Wrapper,
} from "./style";
import { useState } from "react";
import CustomTextarea from "@components/common/CustomTextarea";
import { BUTTON_STATE, BUTTON_TYPE, CustomButton, CustomTextInput } from "..";

const InputApply = ({ nextStage }: ApplyProps) => {
  const [COLOR, mode] = useThemeStyle();
  const [info, setInfo] = useState({ desc: "", source: "" });

  const changeDesc = (value: string) => {
    setInfo((prev) => {
      return {
        ...prev,
        desc: value,
      };
    });
  };
  const changeSource = (value: string) => {
    setInfo((prev) => {
      return {
        ...prev,
        source: value,
      };
    });
  };
  const navigate = () => {
    if (info.desc !== "") nextStage();
  };

  const descStyle = {
    backgroundColor: COLOR.Background.input,
  };

  return (
    <Wrapper>
      <Wrapper style={{ alignItems: "flex-start" }}>
        <TitleWrapper>
          {mode ? <TitleObjet /> : <></>}
          <DynamicTitle />
        </TitleWrapper>
        <Content COLOR={COLOR} style={{ marginTop: 10 }}>
          작성해주신 설명은 검토 후 승인이 되면 알려드려요!
        </Content>
        <ContentBox style={{ marginTop: 32 }}>
          <ContentTitle COLOR={COLOR}>용어 설명</ContentTitle>
          <CustomTextarea
            value={info.desc}
            max={250}
            onChangeText={changeDesc}
            placeholder="용어에 대한 나만의 생각을 편안하게 남겨주세요."
            style={descStyle}
          />
        </ContentBox>
        <ContentBox style={{ marginTop: 32 }}>
          <ContentTitle COLOR={COLOR}>출처</ContentTitle>
          <CustomTextInput
            value={info.source}
            placeholder="홈페이지 url 등"
            max={false}
            onChangeText={changeSource}
            maxLength={100}
          />
          <ContentCaption COLOR={COLOR} style={{ marginTop: 10 }}>
            출처가 있다면 반드시 출처를 밝혀주세요.
          </ContentCaption>
        </ContentBox>
      </Wrapper>
      <CustomButton
        title="신청하기"
        theme={mode}
        type={BUTTON_TYPE.primary}
        state={info.desc !== "" ? BUTTON_STATE.active : BUTTON_STATE.default}
        onPress={navigate}
        style={{ width: "100%", marginTop: 48 }}
      />
    </Wrapper>
  );
};

const DynamicTitle = () => {
  const [COLOR, mode] = useThemeStyle();
  return mode ? (
    <Title COLOR={COLOR}>나만의 용어 설명을 남겨주세요</Title>
  ) : (
    <Title COLOR={COLOR}>
      <Title COLOR={COLOR} style={{ color: COLOR.THEME.primary[100] }}>
        나만의 용어 설명
      </Title>
      을 남겨주세요
    </Title>
  );
};

export default InputApply;
