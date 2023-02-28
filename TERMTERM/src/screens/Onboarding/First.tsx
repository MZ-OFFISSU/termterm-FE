import styled from "styled-components/native";
import { View, Keyboard } from "react-native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import {
  CustomTextInput,
  CustomButton,
  BUTTON_TYPE,
  BUTTON_STATE,
} from "@components/index";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import { Props } from "@interfaces/onboarding";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";
import { infoState } from "@recoil/signupState";

const First = ({ onEnd }: Props) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [info, setInfo] = useRecoilState(infoState);
  const [name, setName] = useState("");
  const [btnPosition, setBtnPosiition] = useState(30);

  const nextStage = () => {
    if (onEnd && name !== "") {
      setInfo({
        ...info,
        name: name,
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
        paddingTop: 80,
      }}
    >
      <Highlight style={{ top: 97, left: 0 }} />
      <Title>
        <Title style={{ fontWeight: "900", zIndex: 1 }}>
          원할한 커뮤니케이션
        </Title>
        {`을 위한\n준비를 시작해볼까요?`}
      </Title>

      <Subtitle>닉네임</Subtitle>
      <CustomTextInput
        value={name}
        onChangeText={(text) => setName(text)}
        maxLength={20}
      />
      {name === "" ? (
        <Warning>
          한글, 영어, 숫자, 특수문자(. , ! ? _ - ~)로만 구성할 수 있어요.
        </Warning>
      ) : (
        <></>
      )}
      <CustomButton
        title="확인"
        theme={theme}
        type={BUTTON_TYPE.primary}
        state={name === "" ? BUTTON_STATE.default : BUTTON_STATE.active}
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

const Title = styled.Text`
  font-size: 21px;
  color: ${LIGHT_COLOR_STYLE.Text.active};
  white-space: pre-line;
  position: relative;
  line-height: 28px;
`;

const Highlight = styled.View`
  width: 170px;
  height: 10px;
  background-color: ${LIGHT_COLOR_STYLE.THEME.primary[100]};
  position: absolute;
`;

const Subtitle = styled.Text`
  font-size: 18px;
  color: ${LIGHT_COLOR_STYLE.Text.active};
  font-weight: 500;
  margin-top: 40px;
`;

const Warning = styled.Text`
  font-size: 10px;
  font-weight: 400;
  color: ${LIGHT_COLOR_STYLE.Text.muted};
  margin-top: 5px;
`;

export default First;
