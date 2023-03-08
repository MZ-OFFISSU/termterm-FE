import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { UrlText, NonScrollContainer } from "@components/index";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import SocialLoginButton from "@components/buttons/SocialLogin";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

export type Props = StackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: Props) => {
  const [width, setWidth] = useState(140);
  const [btnWidth, setBtnWidth] = useState(60);

  /**로고 너비 계산 함수 */
  const calculWidth = () => {
    if (screenWidth < 390) return;
    if (screenWidth < 435) {
      setWidth(175);
      return;
    }
    if (screenWidth < 500) {
      setWidth(200);
      return;
    }
    if (screenWidth > 500) {
      setWidth(240);
      return;
    }
  };

  useEffect(() => {
    calculWidth();
  }, []);

  return (
    <NonScrollContainer bgColor={"#000000"}>
      <Container>
        <AutoSizedImage
          source={require("@assets/termtermlogo.png")}
          width={width}
        />
        <TitleBox>
          <SubTitle>함께 만들어나가는,</SubTitle>
          <Title>나만의 용어 모음집</Title>
        </TitleBox>
        <ButtonBox>
          <SocialLoginButton
            type="kakao"
            onPress={() => navigation.navigate("Onboarding")}
          />
          <SocialLoginButton
            type="google"
            onPress={() => navigation.navigate("ToolBar")}
          />
          <SocialLoginButton 
            type="apple" 
            onPress={() => navigation.navigate("Mainhome")}
          />
        </ButtonBox>
        <UrlText
          text={`회원가입시 서비스 이용약관 및 개인정보 처리방침에\n동의하게 됩니다.`}
          url=""
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#6E7277",
            marginTop: 20,
          }}
        />
      </Container>
      <QuestionBox>
        <UrlText
          text={`이용하시는 데에 어려움이 있나요?`}
          url=""
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#929292",
          }}
        />
      </QuestionBox>
    </NonScrollContainer>
  );
};

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleBox = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
`;

const SubTitle = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: 300;
`;

const Title = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: 900;
  margin-top: 5px;
`;

const ButtonBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const QuestionBox = styled.View`
  width: 100%;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;
