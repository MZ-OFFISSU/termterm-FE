import styled from "styled-components/native";
import { View, Keyboard } from "react-native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import {
  CustomTextInput,
  CustomButton,
  BUTTON_TYPE,
  BUTTON_STATE,
  CustomSelector,
} from "@components/index";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import { Props } from "@interfaces/onboarding";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";
import { infoState } from "@recoil/signupState";

const Second = ({ onEnd }: Props) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [info, setInfo] = useRecoilState(infoState);
  const [domain, setDomain] = useState("");
  const [job, setJob] = useState("");
  const [btnPosition, setBtnPosiition] = useState(30);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    { label: "신입", value: "신입" },
    { label: "1년 미만", value: "1년 미만" },
    { label: "1년 이상 2년 미만", value: "1년 이상 2년 미만" },
    { label: "2년 이상 3년 미만", value: "2년 이상 3년 미만" },
    { label: "3년 이상 4년 미만", value: "3년 이상 4년 미만" },
    { label: "4년 이상 5년 미만", value: "4년 이상 5년 미만" },
    { label: "5년 이상", value: "5년 이상" },
    { label: "시니어", value: "시니어" },
  ]);

  const nextStage = () => {
    if (onEnd && domain !== "" && job !== "") {
      setInfo({
        ...info,
        domain: domain,
        job: job,
        career: value,
      });
      onEnd();
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

  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        paddingTop: 50,
      }}
    >
      <InputWrapper>
        <Subtitle>도메인</Subtitle>
        <CustomTextInput
          value={domain}
          onChangeText={(text) => setDomain(text)}
          maxLength={20}
          placeholder="예시) 교육, 커머스, 여행, 소셜, AI 등"
        />
      </InputWrapper>
      <InputWrapper>
        <Subtitle>직업</Subtitle>
        <CustomTextInput
          value={job}
          onChangeText={(text) => setJob(text)}
          maxLength={20}
          placeholder="예시) 서비스 기획자, UX 디자이너, 개발자 등"
        />
      </InputWrapper>
      <InputWrapper>
        <Subtitle>연차</Subtitle>
        <CustomSelector
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="연차를 선택해주세요."
          listMode="MODAL"
          modalProps={{
            animationType: "fade",
          }}
          modalTitle="연차를 선택해주세요."
        />
      </InputWrapper>

      <Warning style={{ alignSelf: "center", bottom: btnPosition + 55 }}>
        도메인, 직업, 연차는 추후에 'MY'의 내 계정에서 수정할 수 있어요.
      </Warning>
      <CustomButton
        title="확인"
        theme={theme}
        type={BUTTON_TYPE.primary}
        state={
          job === "" || domain === "" || value === ""
            ? BUTTON_STATE.default
            : BUTTON_STATE.active
        }
        onPress={() => nextStage()}
        style={{
          width: screenWidth - 32,
          alignSelf: "center",
          position: "absolute",
          bottom: btnPosition,
        }}
      />
    </View>
  );
};

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

const Warning = styled.Text`
  font-size: 10px;
  font-weight: 400;
  color: ${LIGHT_COLOR_STYLE.Text.muted};
  position: absolute;
  text-align: center;
`;

export default Second;
