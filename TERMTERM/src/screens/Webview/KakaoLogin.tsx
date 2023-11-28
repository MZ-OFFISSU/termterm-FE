import { View } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from "@api/secret";
import AuthApi from "@api/AuthApi";
import { setAccessToken, setRefreshToken } from "@utils/tokenHandler";
import MemberApi from "@api/MemberApi";
import { MemberInfo } from "Member";
import { loginFailed, loginSucceed, needRegister } from "@utils/showToast";
import { Linking, Platform } from "react-native";

export type HomeScreenProps = StackScreenProps<RootStackParamList, "Kakao">;

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const KakaoLogin = ({ navigation }: HomeScreenProps) => {
  const authApi = new AuthApi();
  const memberApi = new MemberApi();

  // Mozilla/5.0 (Linux; Android 8.0.0; SM-G935S Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Mobile Safari/537.36
  const customUserAgent =
    "Mozilla/5.0 (Linux; Android 8.0.0; SM-G935S Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Mobile Safari/537.36";

  const onShouldStartLoadWithRequest = (
    request: WebViewNavigation
  ): boolean => {
    console.log(request);
    if (request.url.startsWith("kakaotalk://")) {
      Linking.openURL(request.url);
      return false;
    }
    return true;
  };

  const logInProgress = (data: any) => {
    const exp = "code=";

    if (!data) return;

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
      navigation.reset({ routes: [{ name: "Onboarding" }] });
    }
  };

  const getToken = async (code: string) => {
    try {
      const data = await authApi.postCodeToServer(code, "kakao");
      await setAccessToken(data.access_token);
      await setRefreshToken(data.refresh_token);

      const memberInfo = await memberApi.getInfo();
      checkInfo(memberInfo);
    } catch (err) {
      console.log(err);
      loginFailed();
      navigation.reset({
        routes: [{ name: "Login", params: { nonAuto: true } }],
      });
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
        userAgent={customUserAgent}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      />
    </View>
  );
};

export default KakaoLogin;
