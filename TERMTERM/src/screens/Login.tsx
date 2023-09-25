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
import { useMember } from "@hooks/useMember";
import { loginFailed, loginSucceed, needRegister } from "@utils/showToast";
import { useHaptics } from "@hooks/useHaptics";
import * as AppleAuthentication from "expo-apple-authentication";
import AuthApi from "@api/AuthApi";
import { MemberInfo } from "Member";
import { setAccessToken, setRefreshToken } from "@utils/tokenHandler";
import MemberApi from "@api/MemberApi";

export type Props = StackScreenProps<RootStackParamList, "Login">;

type AppleAuthResponse = {
  authorizationCode: string;
  email: string;
  fullName: {
    familyName: string;
    givenName: string;
    middleName: string | null;
    namePrefix: string | null;
    nameSuffix: string | null;
    nickname: string | null;
  };
  identityToken: string;
  realUserStatus: number;
  state: null;
  user: string;
};

const Login = ({ navigation, route }: Props) => {
  const { haptic } = useHaptics();
  const [width, setWidth] = useState(80);
  const { user, loading } = useMember();
  const authApi = new AuthApi();
  const memberApi = new MemberApi();

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

  const checkAutoLogin = () => {
    if (!route.params.nonAuto && user.isLogined && !loading) {
      haptic("success");
      navigation.reset({ routes: [{ name: "ToolBar" }] });
      loginSucceed();
    }
  };

  const checkInfo = (memberInfo: MemberInfo) => {
    if (memberInfo.domain) {
      loginSucceed();
      navigation.reset({ routes: [{ name: "ToolBar" }] });
    } else {
      needRegister();
      navigation.reset({ routes: [{ name: "Onboarding" }] });
    }
  };

  const appleOauth = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const data = await authApi.postAppleTokenToServer(
        credential.authorizationCode!,
        credential.identityToken!
      );
      await setAccessToken(data.access_token);
      await setRefreshToken(data.refresh_token);

      const memberInfo = await memberApi.getInfo();
      checkInfo(memberInfo);
    } catch (e) {
      console.log(e);
      loginFailed();
    }
  };

  useEffect(() => {
    calculWidth();
  }, []);

  useEffect(() => {
    checkAutoLogin();
  }, [user.isLogined, loading]);

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
            onPress={() => navigation.navigate("Google")}
          />
          <SocialLoginButton
            type="apple"
            // onPress={() => navigation.navigate("Support")}
            onPress={appleOauth}
          />
        </ButtonBox>
        <NonUrl style={{ marginTop: 30 }}>
          {`회원가입시 `}
          <UrlText
            text={`서비스 이용약관`}
            url="https://www.notion.so/termterm-official/termterm-c70c9239619341fea412d34b77407322?pvs=4"
            underline={true}
          />{" "}
          및{" "}
          <UrlText
            text={`개인정보 처리방침`}
            url="https://www.notion.so/termterm-official/termterm-4b732dfde57c41e7a30ffa4d0e8fd246?pvs=4"
            underline={true}
          />
          {`에\n동의하게 됩니다.`}
        </NonUrl>
      </Container>
      <QuestionBox>
        <UrlText
          text={`이용하시는 데에 어려움이 있나요?`}
          url="https://www.notion.so/termterm-official/termterm-4b732dfde57c41e7a30ffa4d0e8fd246?pvs=4"
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
