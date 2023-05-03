import styled from "styled-components/native";
import { View, Keyboard, Text, TextInput } from "react-native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";
import { Props } from "@interfaces/support";
import { Value } from "react-native-reanimated";
import { CustomSelector, CustomTextInput } from "@components/index";

const First = ({ onEnd }: Props) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [btnPosition, setBtnPosiition] = useState(30);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState([
    { label: '이용 문의', value: '이용 문의' },
    { label: '로그인/회원가입 문의', value: '로그인/회원가입 문의' },
    { label: '서비스 불편/오류 제보', value: '서비스 불편/오류 제보' },
    { label: '서비스 제안', value: '서비스 제안' },
    { label: '기타 문의', value: '기타 문의' },
  ]);
  const [value, setValue] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const [inquiryInfo, setInquiryInfo] = useState({
    email: '',
    inquiryType: '',
    inquiryContent: '',
  });
  const MAX_LENGTH = 1000;

  const nextStage = () => {
    if (onEnd && email !== "" && inquiryContent !== "") {
        setInquiryInfo({
            email: email,
            inquiryType: value,
            inquiryContent: inquiryContent,
        });
        onEnd();
    }
  }

  const handleTextChange = (value: string) => {
    if (value.length <= MAX_LENGTH) {
      setInquiryContent(value);
    }
  };

  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        paddingTop: 80,
      }}
    >
      <InputWrapper>
        <Subtitle>답변을 받으실 이메일</Subtitle>
        <CustomTextInput
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
        
      </InputWrapper>
    </View>
  );
};

export default First;

const Subtitle = styled.Text`
  font-size: 18px;
  color: ${LIGHT_COLOR_STYLE.Text.active};
  font-weight: 500;
`;

const InputWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
`;

const CustomTextArea = styled.TextInput`
    
`;