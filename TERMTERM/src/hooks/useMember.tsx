import MemberApi from "@api/MemberApi";
import { useEffect, useState } from "react";
import { loginState, LoginState } from "@recoil/loginState";
import { useRecoilState } from "recoil";

export const useMember = () => {
  const memberApi = new MemberApi();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(loginState);

  const checkingLogin = async () => {
    try {
      setLoading(true);
      const info = await memberApi.getInfo();
      const newUserState: LoginState = {
        isLogined: true,
        info: info,
      };
      setUser(newUserState);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkingLogin();
  }, []);

  return { user, loading };
};
