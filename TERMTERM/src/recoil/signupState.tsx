import { atom } from "recoil";

export interface UserInfo {
  name: string;
  domain: string;
  job: string;
  career: string;
  interests: Array<string>;
}

const defaultInfo: UserInfo = {
  name: "",
  domain: "",
  job: "",
  career: "",
  interests: [],
};
/**
 * 라이트 모드 : true
 * 다크모드 : false
 */
export const infoState = atom<UserInfo>({
  key: "userInfo",
  default: defaultInfo,
});
