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
      url: `${BASE_URL}v1/auth/${oauth}`,
      headers: {
        "auth-code": code,
      },
    });

    return data.data.data;
  };
}

export default AuthApi;
