import { MemberInfo, ModifiedMemberInfo } from "Member";
import { get, put, remove } from "./AxiosCreate";

class MemberApi {
  /**  사용자 정보 받아오기 */
  getInfo = async (): Promise<MemberInfo> => {
    const data = await get<MemberInfo>(`/v1/member/info`);
    return data;
  };

  /**  사용자 기본 정보 수정하기 */
  putInfo = async (modifyInfo: ModifiedMemberInfo): Promise<string> => {
    const data = await put<string>(`/v1/member/info`, modifyInfo);
    return data;
  };

  /** 사용자 관심사 수정하기 */
  putCategory = async (categories: string[]): Promise<string> => {
    const data = await put<string>(`/v1/member/info/category`, {
      categories: categories,
    });
    return data;
  };

  /** 사용자 닉네임 중복 검사하기 */
  nicknameDoubleCheck = async (nickname: string): Promise<string> => {
    const data = await get<string>(`/v1/member/nickname/check`, {
      params: {
        nickname: nickname,
      },
    });
    return data;
  };

  /** 프로필 이미지 받아오기 */
  getProfileImage = async (): Promise<string> => {
    const data = await get<string>(`/v1/member/info/profile-image`);
    return data;
  };

  /** 프로필 이미지 제거하기 */
  removeProfileImage = async (): Promise<string> => {
    const data = await remove<string>(`/v1/member/info/profile-image`);
    return data;
  };

  /** S3로 이미지 업데이트할 수 있는 URL 발급.
   * 발급 이후 하단의 syncPresignedUrl로 API 요청을 보내야함
   */
  getPresignedUrl = async (): Promise<string> => {
    const data = await get<string>(
      `/v1/member/info/profile-image/presigned-url`
    );
    return data;
  };

  /** presigned url로 이미지 업데이트 후, 여기로 동기화 */
  syncPresignedUrl = async (): Promise<string> => {
    const data = await get<string>(`/v1/member/info/profile-image/sync`);
    return data;
  };

  /** 회원 탈퇴 */
  withdraw = async (): Promise<string> => {
    const data = await get<string>(`/v1/member/withdraw`);
    return data;
  };
}

export default MemberApi;
