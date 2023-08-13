import { BASE_URL } from "@api/secret";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

/** 액세스토큰 저장함수 */
export const setAccessToken = async (token: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem("access", token);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

/** 액세스토큰 가져오기 함수 */
export const getAccessToken = async (): Promise<string | null> => {
  const access = await AsyncStorage.getItem("access");
  return access;
};

/** 리프레시토큰 저장 함수 */
export const setRefreshToken = async (token: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem("refresh", token);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

/** 리프레시토큰 가져오기 함수 */
export const getRefreshToken = async (): Promise<string | null> => {
  const refresh = await AsyncStorage.getItem("refresh");
  return refresh;
};

/** 리프레시토큰 갱신함수 */
export const updateRefreshToken = async () => {
  const access = await getAccessToken();
  const refresh = await getRefreshToken();

  const data: any = await axios({
    method: "post",
    url: `${BASE_URL}/v1/auth/token/refresh`,
    data: {
      access_token: access,
      refresh_token: refresh,
    },
  });

  if (data.access_token && data.refresh_token) {
    setAccessToken(data.data.access_token);
    setRefreshToken(data.data.refresh_token);
  }
};
