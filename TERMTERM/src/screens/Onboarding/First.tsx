import styled from "styled-components/native";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
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
import { infoState } from "@recoil/signupState";
import { nicknameReg } from "@utils/reg";
import { useThemeStyle } from "@hooks/useThemeStyle";
import MemberApi from "@api/MemberApi";
import { useControllerTheme } from "@hooks/useControllerTheme";

const First = ({ onEnd }: Props) => {
  const memberApi = new MemberApi();

  const [COLOR, mode] = useThemeStyle();
  const { themeController } = useControllerTheme();
  const [info, setInfo] = useRecoilState(infoState);
  const [name, setName] = useState("");
  const [btnPosition, setBtnPosiition] = useState(30);
  const [warn, setWarn] = useState(false);

  const inputName = (text: string) => {
    if (nicknameReg(text)) setName(text);
  };

  const checkWarn = async (): Promise<boolean> => {
    try {
      //닉네임이 중복되지 않음 (사용가능)
      await memberApi.nicknameDoubleCheck(name);
      setWarn(false);
      return true;
    } catch (err) {
      //닉네임이 중복됨 (사용불가능)
      setWarn(true);
      return false;
    }
  };

  const nextStage = async () => {
    //중복검사 후, 중복되면 함수 중지
    const check = await checkWarn();
    if (!check) return;

    //다음 스테이지로
    if (onEnd && name !== "") {
      setInfo({
        ...info,
        name: name,
      });
      onEnd();
    }
  };

  useEffect(() => {
    themeController(true);

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            원활한 커뮤니케이션
          </Title>
          {`을 위한\n준비를 시작해볼까요?`}
        </Title>

        <Subtitle>닉네임</Subtitle>
        <CustomTextInput
          value={name}
          onChangeText={(text) => inputName(text)}
          maxLength={7}
        />
        {name === "" ? (
          <Warning>
            한글, 영어, 숫자, 특수문자(. , ! ? _ - ~)로만 구성할 수 있어요.
          </Warning>
        ) : warn ? (
          <Warning style={{ color: COLOR.THEME.negative[100] }}>
            이미 사용중인 닉네임입니다.
          </Warning>
        ) : (
          <></>
        )}
        <CustomButton
          title="확인"
          theme={mode}
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
    </TouchableWithoutFeedback>
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
