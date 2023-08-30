import { View } from "react-native";
import { WebView } from "react-native-webview";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from "@api/secret";
import AuthApi from "@api/AuthApi";
import { setAccessToken, setRefreshToken } from "@utils/tokenHandler";
import MemberApi from "@api/MemberApi";
import { MemberInfo } from "Member";
import { loginFailed, loginSucceed, needRegister } from "@utils/showToast";

export type HomeScreenProps = StackScreenProps<RootStackParamList, "Google">;

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const GoogleLogin = ({ navigation }: HomeScreenProps) => {
  const authApi = new AuthApi();
  const memberApi = new MemberApi();

  const logInProgress = (data: any) => {
    const startIdx = data.indexOf("code=") + 5;
    const endIdx = data.indexOf("&", startIdx);
    if (startIdx < 5) return null; // "code=" not found in the URL
    if (endIdx === -1) {
      getToken(data.substring(startIdx));
    }
    getToken(data.substring(startIdx, endIdx));
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
      const data = await authApi.postCodeToServer(code, "google");
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
          uri: `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=profile%20email%20openid&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https%3A%2F%2Fapi.iterview.com%2Fv1%2Fsocial-auth&client_id=413663542158-o4k411e714pjhibpb2nbmpa54o6vucuf.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow`,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => {
          logInProgress(event.nativeEvent.url);
        }}
        userAgent="Chrome/56.0.0.0 Mobile"
      />
    </View>
  );
};

export default GoogleLogin;
