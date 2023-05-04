import styled from "styled-components/native";
import { View, Keyboard, Text } from "react-native";
import { 
  LIGHT_COLOR_STYLE, 
  TEXT_STYLES, 
  TEXT_STYLE_SIZE, 
  TEXT_STYLE_WEIGHT } from "@style/designSystem";
import { CustomButton, BUTTON_STATE, BUTTON_TYPE } from "@components/index";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";
import { Props } from "@interfaces/support";
import { CheckBox } from '@rneui/themed';

const Second = ({ onEnd }: Props) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [btnPosition, setBtnPosiition] = useState(30);
  const [checkState, setCheckState] = useState(false);

  const nextStage = () => {
    if (onEnd && checkState !== false) {
      onEnd();
    }
  }

  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        paddingTop: 80,
      }}
    >
      <Title>
        개인정보 수집 및 이용에 대한 안내
      </Title>
      <SubTitle>
        {`O'MZ는 이용자 문의를 처리하기 위해 다음과 같이 개인\n정보를 수집 및 이용하며, 이용자의 개인정보를 안전하게\n취급하는데 최선을 다하고 있습니다.`}
      </SubTitle>
      <TextWrapper>
        <InfoTitle>수집항목</InfoTitle>
        <InfoContent>
          이메일 주소, 닉네임, Device 정보, OS Version, App Version
        </InfoContent>
      </TextWrapper>
      <TextWrapper>
        <InfoTitle>수집목적</InfoTitle>
        <InfoContent>
          문의, 요청, 불편사항 확인 및 처리결과 회신
        </InfoContent>
      </TextWrapper>
      <TextWrapper>
        <InfoTitle>수집기간</InfoTitle>
        <InfoContent>
          3년간 보관 후 지체없이 바로 파기
        </InfoContent>
      </TextWrapper>
      <TextWrapper>
        <InfoContent>
          {`위 동의를 거부 할 권리가 있으며, 동의를 거부하실 경우\n문의 처리 및 결과 회신이 제한됩니다.`}
        </InfoContent>
      </TextWrapper>
      <TextWrapper>
        <InfoContent style={{ marginTop: '-3%'}}>
          {`더 자세한 내용에 대해서는 termterm 개인정보 처리방침을\n참고하시기 바랍니다.`}
        </InfoContent>
        <RowBox>
          <CheckBox
            checked={checkState}
            onPress={() => setCheckState(!checkState)}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            checkedColor='#000000'
          />
          <AgreeText>위의 내용에 동의합니다.</AgreeText>
        </RowBox>
      </TextWrapper>
      <CustomButton
        title="다음"
        theme={theme}
        type={BUTTON_TYPE.primary}
        state={
          checkState === false
          ? BUTTON_STATE.default
          : BUTTON_STATE.active
        }
        onPress={() => nextStage()}
        style={{
          width: screenWidth - 32,
          alignSelf: 'center',
          position: 'absolute',
          bottom: btnPosition,
        }}
      />
    </View>
  );
};

export default Second;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 900;
  z-index: 1;
  color: ${LIGHT_COLOR_STYLE.Text.active};
  white-space: pre-line;
  position: relative;
`;

const SubTitle = styled.Text`
  font-size: ${TEXT_STYLE_SIZE.xsm};
  color: ${LIGHT_COLOR_STYLE.Text.darken};
  white-space: pre-line;
  position: relative;
  margin-top: 10px;
  line-height: 23px;
`;

const TextWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
`;

const InfoTitle = styled.Text`
  color: ${LIGHT_COLOR_STYLE.Text.default};
  font-size: 16px;
  font-weight: 800;
  margin: 5px 0;
`;

const InfoContent = styled.Text`
  color: ${LIGHT_COLOR_STYLE.Text.default};
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

const RowBox = styled.View`
  display: flex;
  flex-direction: row;
  margin: 30px 0 0 -15px;
`;

const AgreeText = styled.Text`
  font-size: 18px;
  font-weight: 900;
  margin: 17px 0 0 -15px;
  color: ${LIGHT_COLOR_STYLE.Text.active};
`;