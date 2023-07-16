import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { UrlText, NonScrollContainer } from "@components/index";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import SocialLoginButton from "@components/buttons/SocialLogin";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useSafeColor } from "@hooks/useSafeColor";
import { NonUrl } from "@components/common/UrlText";

export type Props = StackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: Props) => {
  const [width, setWidth] = useState(80);
  useSafeColor();

  /**로고 너비 계산 함수 */
  const calculWidth = () => {
    if (screenWidth < 390) return;
    if (screenWidth < 435) {
      setWidth(80);
      return;
    }
    if (screenWidth < 500) {
      setWidth(85);
      return;
    }
    if (screenWidth > 500) {
      setWidth(90);
      return;
    }
  };

  useEffect(() => {
    calculWidth();
  }, []);

  return (
    <NonScrollContainer bgColor={"#121212"}>
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
            // onPress={() => navigation.navigate("Onboarding")}
            onPress={() => navigation.navigate("Kakao")}
          />
          <SocialLoginButton
            type="google"
            onPress={() => navigation.navigate("ToolBar")}
          />
          <SocialLoginButton
            type="apple"
            onPress={() => navigation.navigate("Support")}
          />
        </ButtonBox>
        <NonUrl style={{ marginTop: 30 }}>
          {`회원가입시 `}
          <UrlText text={`서비스 이용약관`} url="" underline={true} /> 및{" "}
          <UrlText text={`개인정보 처리방침`} url="" underline={true} />
          {`에\n동의하게 됩니다.`}
        </NonUrl>
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
