import styled from "styled-components/native";
import { colorTheme, LIGHT_COLOR_STYLE, TYPO_STYLE } from "@style/designSystem";
import { CustomButton, BUTTON_STATE, BUTTON_TYPE } from "@components/index";
import { useState } from "react";
import { screenWidth } from "@style/dimensions";
import { Props } from "@interfaces/support";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { CheckBoxContent, CheckBoxWrapper } from "@components/apply/style";
import { CheckBoxIcon } from "@components/apply/StandardApply";

const Second = ({ onEnd }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [checkState, setCheckState] = useState(false);

  const onCheck = () => {
    setCheckState((prev) => !prev);
  };

  const nextStage = () => {
    if (onEnd && checkState !== false) {
      onEnd();
    }
  };

  return (
    <Container>
      <Title COLOR={COLOR} mode={mode}>
        개인정보 수집 및 이용에 대한 안내
      </Title>
      <SubTitle COLOR={COLOR} mode={mode}>
        {`O'MZ는 이용자 문의를 처리하기 위해 다음과 같이 개인\n정보를 수집 및 이용하며, 이용자의 개인정보를 안전하게\n취급하는데 최선을 다하고 있습니다.`}
      </SubTitle>
      <TextWrapper>
        <InfoTitle COLOR={COLOR} mode={mode}>
          수집항목
        </InfoTitle>
        <InfoContent COLOR={COLOR} mode={mode}>
          이메일 주소, 닉네임, Device 정보, OS Version, App Version
        </InfoContent>
      </TextWrapper>
      <TextWrapper>
        <InfoTitle COLOR={COLOR} mode={mode}>
          수집목적
        </InfoTitle>
        <InfoContent COLOR={COLOR} mode={mode}>
          문의, 요청, 불편사항 확인 및 처리결과 회신
        </InfoContent>
      </TextWrapper>
      <TextWrapper>
        <InfoTitle COLOR={COLOR} mode={mode}>
          수집기간
        </InfoTitle>
        <InfoContent COLOR={COLOR} mode={mode}>
          3년간 보관 후 지체없이 바로 파기
        </InfoContent>
      </TextWrapper>
      <TextWrapper>
        <InfoContent COLOR={COLOR} mode={mode}>
          {`위 동의를 거부 할 권리가 있으며, 동의를 거부하실 경우\n문의 처리 및 결과 회신이 제한됩니다.`}
        </InfoContent>
      </TextWrapper>
      <TextWrapper>
        <InfoContent COLOR={COLOR} mode={mode} style={{ marginTop: "-3%" }}>
          {`더 자세한 내용에 대해서는 termterm 개인정보 처리방침을 참고하시기 바랍니다.`}
        </InfoContent>
      </TextWrapper>
      <CheckBoxWrapper onPress={onCheck} style={{ marginTop: 36 }}>
        <CheckBoxIcon checked={checkState} />
        <CheckBoxContent COLOR={COLOR}>위의 내용에 동의합니다.</CheckBoxContent>
      </CheckBoxWrapper>
      <CustomButton
        title="제출하기"
        theme={mode}
        type={BUTTON_TYPE.primary}
        state={
          checkState === false ? BUTTON_STATE.default : BUTTON_STATE.active
        }
        onPress={() => nextStage()}
        style={{
          width: screenWidth - 32,
          alignSelf: "center",
          marginTop: 52,
        }}
      />
    </Container>
  );
};

export default Second;

const Container = styled.View`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 34px 25px;
`;

const Title = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Heading[3].ExtraBold};
  z-index: 1;
  color: ${(props) => props.COLOR.Text.active};
  white-space: pre-line;
  position: relative;
`;

const SubTitle = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Subheading[1].Regular};
  color: ${(props) =>
    props.mode ? props.COLOR.Text.darken : props.COLOR.Text.lighten};
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

const InfoTitle = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  color: ${(props) => props.COLOR.Text.default};
  ${TYPO_STYLE.Body[2].SemiBold};
  margin: 5px 0;
`;

const InfoContent = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  color: ${(props) => props.COLOR.Text.default};
  ${TYPO_STYLE.Subheading[1].Regular};
  line-height: 20px;
`;
