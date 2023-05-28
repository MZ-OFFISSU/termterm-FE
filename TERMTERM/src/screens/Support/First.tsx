import styled from "styled-components/native";
import { TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import {
  LIGHT_COLOR_STYLE,
  TEXT_STYLES,
} from "@style/designSystem";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import { Props } from "@interfaces/support";
import {
  BUTTON_STATE,
  BUTTON_TYPE,
  CustomButton,
  CustomSelector,
  CustomEmailInput,
} from "@components/index";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { emailReg } from "@utils/reg";

const First = ({ onEnd }: Props) => {
  const [COLOR, theme] = useThemeStyle();
  const [btnPosition, setBtnPosiition] = useState(30);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState([
    { label: "이용 문의", value: "이용 문의" },
    { label: "로그인/회원가입 문의", value: "로그인/회원가입 문의" },
    { label: "서비스 불편/오류 제보", value: "서비스 불편/오류 제보" },
    { label: "서비스 제안", value: "서비스 제안" },
    { label: "기타 문의", value: "기타 문의" },
  ]);
  const [value, setValue] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const [textLength, setTextLength] = useState(0);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [inquiryInfo, setInquiryInfo] = useState({
    email: "",
    inquiryType: "",
    inquiryContent: "",
  });

  const nextStage = () => {
    if (onEnd && email !== "" && value !== "" && inquiryContent !== "") {
      if (!emailReg(email)) {
        setIsEmailValid(false);
      } else {
        setIsEmailValid(true);
        setInquiryInfo({
          email: email,
          inquiryType: value,
          inquiryContent: inquiryContent,
        });
        onEnd();
      }
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
      setBtnPosiition(10 + e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setBtnPosiition(30);
    });

    showSubscription;
    hideSubscription;
  }, []);
  /**
   * inquiryContent 1000자 제한 함수
   */
  const handleTextChange = (text: string) => {
    setInquiryContent(text);
    setTextLength(text.length);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          paddingTop: 40,
        }}
      >
        <Highlight style={{ top: 10, left: 0 }} />
        <LargeTitle>문의하고 싶은 내용이 있으신가요?</LargeTitle>
        <Title>
          {`\n휴일을 제외한 평일 하루이내에 답변을 드릴게요.\n휴일을 제외한 하루가 지나도 답변이 오지 않는다면,\n스팸 메일함에 답변이 있을 수 있으니\n스팸 메일함을 확인해주세요.
        `}
        </Title>

        <InputWrapper>
          <Subtitle>답변을 받으실 이메일</Subtitle>
          <CustomEmailInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="termterm@email.com"
          />
        </InputWrapper>
        <InputWrapper>
          <Subtitle>문의 유형</Subtitle>
          <CustomSelector
            open={open}
            value={value}
            items={inquiryType}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setInquiryType}
            placeholder="문의 유형을 선택해주세요."
            listMode="MODAL"
            modalProps={{
              animationType: "fade",
            }}
            modalTitle="문의 유형을 선택해주세요."
          />
        </InputWrapper>
        <InputWrapper>
          <Subtitle>문의 내용</Subtitle>
          <TextAreaBox>
            <CustomTextArea
              value={inquiryContent}
              onChangeText={handleTextChange}
              placeholder="문의하고 싶으신 내용을 편안하게 적어주세요."
              maxLength={1000}
              multiline
              scrollEnabled={false}
            />
          </TextAreaBox>
          <LengthCounter isTextEmpty={textLength > 0}>
            {textLength}/1000
          </LengthCounter>
        </InputWrapper>
        <CustomButton
          title="다음"
          theme={theme}
          type={BUTTON_TYPE.primary}
          state={
            email === "" || value === "" || inquiryContent === ""
              ? BUTTON_STATE.default
              : BUTTON_STATE.active
          }
          onPress={() => nextStage()}
          style={{
            width: screenWidth - 32,
            alignSelf: "center",
            position: "absolute",
            bottom: btnPosition - 90,
          }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default First;

const Highlight = styled.View`
  width: 215px;
  height: 10px;
  background-color: ${LIGHT_COLOR_STYLE.THEME.primary[100]};
  position: absolute;
`;

const LargeTitle = styled.Text`
  font-size: ${TEXT_STYLES.md1.Eb?.fontSize}px;
  font-weight: ${TEXT_STYLES.md1.Eb?.fontWeight};
  z-index: 1;
  color: ${LIGHT_COLOR_STYLE.Text.active};
  white-space: pre-line;
  position: relative;
`;

const Title = styled.Text`
  font-size: ${TEXT_STYLES.xsm.Reg?.fontSize};
  font-weight: ${TEXT_STYLES.xsm.Reg?.fontWeight};
  color: ${LIGHT_COLOR_STYLE.Text.darken};
  white-space: pre-line;
  position: relative;
  line-height: 20px;
`;

const Subtitle = styled.Text`
  font-size: ${TEXT_STYLES.md1.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.md1.Md?.fontWeight};
  color: ${LIGHT_COLOR_STYLE.Text.active};
  font-weight: 500;
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

const CustomTextArea = styled.TextInput`
  color: ${LIGHT_COLOR_STYLE.Text.active};
  font-size: ${TEXT_STYLES.xsm.Reg?.fontSize}px;
  font-weight: ${TEXT_STYLES.xsm.Reg?.fontWeight};
  padding: 20px;

  &::placeholder {
    color: ${LIGHT_COLOR_STYLE.Text.disabled};
  }
`;

const LengthCounter = styled.Text<{ isTextEmpty: boolean }>`
  color: ${(props) =>
    props.isTextEmpty
      ? `${LIGHT_COLOR_STYLE.Text.active}`
      : `${LIGHT_COLOR_STYLE.Text.muted}`};
  font-size: ${TEXT_STYLES["3xsm"].Md?.fontSize}px;
  font-weight: ${TEXT_STYLES["3xsm"].Md?.fontWeight};
  left: 88%;
`;
