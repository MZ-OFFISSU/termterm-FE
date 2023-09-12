import styled from "styled-components/native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { colorTheme, LIGHT_COLOR_STYLE, TYPO_STYLE } from "@style/designSystem";
import { useState } from "react";
import { screenWidth } from "@style/dimensions";
import { Props } from "@interfaces/support";
import {
  BUTTON_STATE,
  BUTTON_TYPE,
  CustomButton,
  CustomSelector,
} from "@components/index";
import { useThemeStyle } from "@hooks/useThemeStyle";
import InquiryApi from "@api/InquiryApi";
import { useRecoilState } from "recoil";
import { inquiryState } from "@recoil/inquiryState";
import CustomEmailInput from "@components/common/CustomEmailInput";
import CustomTextarea from "@components/common/CustomTextarea";

const First = ({ onEnd }: Props) => {
  const inquiryApi = new InquiryApi();

  const [COLOR, mode] = useThemeStyle();
  const [inquiryInfo, setInquiryInfo] = useRecoilState(inquiryState);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState([
    { label: "이용 문의", value: "USE" },
    { label: "로그인/회원가입 문의", value: "AUTH" },
    { label: "서비스 불편/오류 제보", value: "REPORT" },
    { label: "서비스 제안", value: "SUGGESTION" },
    { label: "기타 문의", value: "OTHER" },
  ]);
  const [selectedType, setSelectedType] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const [textLength, setTextLength] = useState(0);

  const nextStage = () => {
    if (onEnd && email !== "" && inquiryContent !== "") {
      setInquiryInfo({
        ...inquiryInfo,
        email: email,
        inquiryType: selectedType,
        inquiryContent: inquiryContent,
      });
      onEnd();
    }
  };

  const DynamicTitleBox = () => {
    const [COLOR, mode] = useThemeStyle();

    const lighten = {
      color: COLOR.Text.lighten,
    };

    const primary = {
      color: COLOR.THEME.primary[100],
    };

    const darken = {
      color: COLOR.Text.darken,
    };

    const LightTitle = () => {
      return (
        <LightTitleWrapper>
          <TitleObjet />
          <Title COLOR={COLOR}>문의하고 싶은 내용이 있으신가요?</Title>
        </LightTitleWrapper>
      );
    };

    const DarkTitle = () => {
      return (
        <Title COLOR={COLOR}>
          <Title COLOR={COLOR} style={primary}>
            문의하고 싶은 내용
          </Title>
          이 있으신가요?
        </Title>
      );
    };

    return (
      <TitleWrapper>
        {mode ? <LightTitle /> : <DarkTitle />}
        <Subtitle
          COLOR={COLOR}
          mode={mode}
          style={mode ? darken : lighten}
        >{`휴일을 제외한 평일 하루이내에 답변을 드릴게요.\n휴일을 제외한 하루가 지나도 답변이 오지 않는다면,\n스팸 메일함에 답변이 있을 수 있으니\n스팸 메일함을 확인해주세요.`}</Subtitle>
      </TitleWrapper>
    );
  };

  /**
   * inquiryContent 1000자 제한 함수
   */
  const handleTextChange = (text: string) => {
    setInquiryContent(text);
    setTextLength(text.length);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container COLOR={COLOR}>
        <DynamicTitleBox />
        <InputWrapper>
          <Subtitle COLOR={COLOR} mode={mode}>
            답변을 받으실 이메일
          </Subtitle>
          <CustomEmailInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            maxLength={50}
            placeholder="termterm@email.com"
          />
        </InputWrapper>
        <InputWrapper style={{ marginTop: 40 }}>
          <Subtitle COLOR={COLOR} mode={mode}>
            문의 유형
          </Subtitle>
          <CustomSelector
            open={open}
            value={selectedType}
            items={inquiryType}
            setOpen={setOpen}
            setValue={setSelectedType}
            setItems={setInquiryType}
            placeholder="문의 유형을 선택해주세요."
            listMode="MODAL"
            modalProps={{
              animationType: "fade",
            }}
            modalTitle="문의 유형을 선택해주세요."
          />
        </InputWrapper>
        <InputWrapper style={{ marginTop: 40 }}>
          <Subtitle COLOR={COLOR} mode={mode}>
            문의 내용
          </Subtitle>
          <CustomTextarea
            value={inquiryContent}
            onChangeText={handleTextChange}
            placeholder="문의하고 싶으신 내용을 편안하게 적어주세요."
            maxLength={1000}
            max={1000}
            style={{ height: 241 }}
          />
        </InputWrapper>
        <CustomButton
          title="다음"
          theme={mode}
          type={BUTTON_TYPE.primary}
          state={
            email === "" || selectedType === "" || inquiryContent === ""
              ? BUTTON_STATE.default
              : BUTTON_STATE.active
          }
          onPress={() => nextStage()}
          style={{
            width: screenWidth - 32,
            alignSelf: "center",
            marginTop: 52,
          }}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default First;

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  position: relative;
  padding: 34px 32px;
`;

const TitleWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[1].ExtraBold};
  text-align: start;
  color: ${(props) => props.COLOR.Text.active};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Subheading[1].Regular};
  color: ${(props) => props.COLOR.Text.active};
  white-space: pre-line;
  margin-top: 16px;
  line-height: 22px;
`;

const InputWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

const TextAreaBox = styled.View`
  width: 100%;
  height: 200px;
  margin-top: 10px;
  border-radius: 6px;
  background-color: ${LIGHT_COLOR_STYLE.Background.input};
`;

const LengthCounter = styled.Text<{ isTextEmpty: boolean }>`
  color: ${(props) =>
    props.isTextEmpty
      ? `${LIGHT_COLOR_STYLE.Text.active}`
      : `${LIGHT_COLOR_STYLE.Text.muted}`};
  ${TYPO_STYLE.Caption[1].Medium};
  left: 88%;
`;

const LightTitleWrapper = styled.View`
  position: relative;
`;

const TitleObjet = styled.View`
  position: absolute;
  width: 255px;
  height: 10px;
  background-color: ${LIGHT_COLOR_STYLE.THEME.primary[100]};
  left: 0px;
  bottom: 0px;
`;
