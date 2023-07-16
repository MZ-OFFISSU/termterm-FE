import { MemberInfo, ModifiedMemberInfo } from "Member";
import { get, put } from "./AxiosCreate";

class MemberApi {
  /**  사용자 정보 받아오기 */
  getInfo = async (): Promise<MemberInfo> => {
    const data = await get<MemberInfo>(`v1/member/info`);
    return data;
  };

  /**  사용자 기본 정보 수정하기 */
  putInfo = async (modifyInfo: ModifiedMemberInfo): Promise<string> => {
    const data = await put<string>(`v1/member/info`, modifyInfo);
    return data;
  };

  /** 사용자 관심사 수정하기 */
  putCategory = async (categories: string[]): Promise<string> => {
    const data = await put<string>(`v1/member/info/category`, {
      categories: categories,
    });
    return data;
  };

  /** 사용자 닉네임 중복 검사하기 */
  nicknameDoubleCheck = async (nickname: string): Promise<string> => {
    const data = await get<string>(`v1/member/nickname/check`, {
      params: {
        nickname: nickname,
      },
    });
    return data;
  };
}

export default MemberApi;
