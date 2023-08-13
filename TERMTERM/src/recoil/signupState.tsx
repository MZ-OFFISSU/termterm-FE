import { MemberInfo } from "Member";
import { atom } from "recoil";

/**------------- 회원가입 관련 -------------**/

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

/**------------- 툴바 - 프로필 관련 -------------**/

export const initProfile: MemberInfo = {
  categories: [],
  domain: "",
  email: "",
  introduction: "",
  job: "",
  memberId: 0,
  name: "",
  nickname: "",
  point: 0,
  profileImage: "",
  yearCareer: 0,
};

export const profileState = atom<MemberInfo>({
  key: "profileInfo",
  default: initProfile,
});
