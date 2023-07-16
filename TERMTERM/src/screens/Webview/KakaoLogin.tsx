import { View } from "react-native";
import { WebView } from "react-native-webview";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from "@api/secret";
import AuthApi from "@api/AuthApi";
import { setAccessToken, setRefreshToken } from "@utils/tokenHandler";
import MemberApi from "@api/MemberApi";
import { MemberInfo } from "Member";
import { loginFailed, loginSucceed, needRegister } from "@utils/showToast";

export type HomeScreenProps = StackScreenProps<RootStackParamList, "Kakao">;

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const KakaoLogin = ({ navigation }: HomeScreenProps) => {
  const authApi = new AuthApi();
  const memberApi = new MemberApi();

  const logInProgress = (data: any) => {
    const exp = "code=";

    const condition = data.indexOf(exp);

    if (condition != -1) {
      const request_code = data.substring(condition + exp.length);
      getToken(request_code);
    }
  };

  const checkInfo = (memberInfo: MemberInfo) => {
    if (memberInfo.domain) {
      loginSucceed();
      navigation.reset({ routes: [{ name: "ToolBar" }] });
    } else {
      needRegister();
      navigation.replace("Onboarding");
    }
  };

  const getToken = async (code: string) => {
    try {
      const data = await authApi.postCodeToServer(code);
      await setAccessToken(data.access_token);
      await setRefreshToken(data.refresh_token);

      const memberInfo = await memberApi.getInfo();
      checkInfo(memberInfo);
    } catch (err) {
      console.log(err);
      loginFailed();
      navigation.reset({ routes: [{ name: "Login" }] });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => {
          logInProgress(event.nativeEvent.url);
        }}
      />
    </View>
  );
};

export default KakaoLogin;
