import MemberApi from "@api/MemberApi";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "@recoil/signupState";
import { MemberInfo } from "Member";
import { getAccessToken } from "@utils/tokenHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTypeFromLabel } from "@utils/careerConverter";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export type ProfileEditModalType =
  | "SUCCESS"
  | "FAILED"
  | "ERROR"
  | "NONE"
  | "WITHDRAW";

/**
 * 프로필 관리 훅
 */
export const useProfile = () => {
  const memberApi = new MemberApi();
  const [profileInfo, setProfileInfo] = useRecoilState(profileState);
  const [warn, setWarn] = useState(false);
  const [loading, setLoading] = useState(false);

  const successToast = () => {
    Toast.show({
      type: "light",
      text1: "프로필 정보 수정이 완료 되었어요!",
    });
  };

  const failedToast = () => {
    Toast.show({
      type: "dark",
      text1: "프로필 정보 수정에 실패했어요.",
    });
  };
  /** 프로필 정보 받아오기 / 최신화 */
  const getProfileInfo = async () => {
    try {
      const res = await memberApi.getInfo();
      setProfileInfo(res);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  /** 닉네임 중복 검사하기 */
  const checkWarn = async (input: MemberInfo): Promise<boolean> => {
    try {
      //닉네임이 중복되지 않음 (사용가능)
      await memberApi.nicknameDoubleCheck(input?.name);
      setWarn(true);
      return true;
    } catch (err) {
      //닉네임이 중복됨 (사용불가능)
      setWarn(false);
      return false;
    }
  };

  /** 프로필 기본 정보 업데이트 */
  const editBasicProfile = async (
    input: MemberInfo,
    career: string
  ): Promise<boolean> => {
    if (await checkWarn(input)) {
      try {
        const config = {
          domain: input.domain,
          introduction: input.introduction,
          job: input.job,
          nickname: input.nickname,
          yearCareer: getTypeFromLabel(career)!,
        };
        await memberApi.putInfo(config);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
    return false;
  };

  /** 관심사 업데이트 */
  const editCategories = async (input: MemberInfo): Promise<boolean> => {
    try {
      await memberApi.putCategory(input.categories);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 앨범에서 파일 가져오기 */
  const fetchBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    return await response.blob();
  };

  /** S3 업로드하기 */
  const uploadToS3 = async (
    presignedUrl: string,
    blob: Blob
  ): Promise<Response | boolean> => {
    try {
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: blob,
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 프로필 이미지 수정 */
  const editProfileImage = async (input: MemberInfo): Promise<boolean> => {
    try {
      const updateS3url = await memberApi.getPresignedUrl();
      const blob = await fetchBlob(input.profileImage);
      await uploadToS3(updateS3url, blob);
      await memberApi.syncPresignedUrl();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 회원 탈퇴 */
  const removeMember = async (): Promise<ProfileEditModalType> => {
    try {
      memberApi.withdraw();
      return "WITHDRAW";
    } catch (err) {
      console.log(err);
      return "ERROR";
    }
  };

  const saveInfo = async (
    input: MemberInfo,
    career: string,
    callback: () => void
  ) => {
    setLoading(true);

    const basicComplete = await editBasicProfile(input, career);
    const categoriesComplete = await editCategories(input);
    const imageComplete = await editProfileImage(input);

    setLoading(false);

    if (basicComplete && categoriesComplete && imageComplete) {
      successToast();
      await getProfileInfo();
      callback();
    } else failedToast();
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return {
    getProfileInfo,
    editBasicProfile,
    editCategories,
    editProfileImage,
    saveInfo,
    removeMember,
    profileInfo,
    warn,
    loading,
  };
};
