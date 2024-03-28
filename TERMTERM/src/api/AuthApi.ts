import { AuthResponse } from "Auth";
import axios from "axios";
import { BASE_URL } from "./secret";

class AuthApi {
  /** 카카오로그인 - 인가코드 발급 후 토큰 요청 */
  postCodeToServer = async (
    code: string,
    oauth: string
  ): Promise<AuthResponse> => {
    const data = await axios({
      method: "post",
      url: `${BASE_URL}/v2/auth/${oauth}`,
      headers: {
        "auth-code": code,
      },
    });

    return data.data.data;
  };

  /** 애플 로그인 */
  postAppleTokenToServer = async (
    code: string,
    token: string
  ): Promise<AuthResponse> => {
    const data = await axios({
      method: "post",
      url: `${BASE_URL}/v2/apple-callback`,
      params: {
        code: code,
        id_token: token,
      },
    });

    return data.data.data;
  };
}

export default AuthApi;
