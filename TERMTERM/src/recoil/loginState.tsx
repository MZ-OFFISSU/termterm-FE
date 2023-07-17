import { MemberInfo } from "Member";
import { atom } from "recoil";

export interface LoginState {
  isLogined: boolean;
  info: MemberInfo | null;
}

const defaultState: LoginState = {
  isLogined: false,
  info: null,
};

/** 로그인한 회원 정보에 관련된 상태 */
export const loginState = atom<LoginState>({
  key: "loginState",
  default: defaultState,
});
