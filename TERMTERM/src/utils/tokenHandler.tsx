import AsyncStorage from "@react-native-async-storage/async-storage";

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

/** 액세스토큰 가져오기 함수 */
export const getRefreshToken = async (): Promise<string | null> => {
  const refresh = await AsyncStorage.getItem("refresh");
  return refresh;
};

/** 리프레시토큰 갱신함수 */
export const updateRefreshToken = async () => {};
