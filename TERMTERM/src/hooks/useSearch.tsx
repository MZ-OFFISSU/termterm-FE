import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from "recoil";
import { recentSearchState } from "@recoil/recentSearchState";

/**
 * 검색어에 따라 자동으로 async storage와 동기화해주는 hooks
 * setStage는 인자에 문자열 배열을 담아서 저장
 */
export function useSearch(): [
  Array<string>,
  (keywords: Array<string>) => void
] {
  //   const [records, setRecords] = useState<Array<string>>([]);
  const [records, setRecords] = useRecoilState(recentSearchState);

  const getKeywords = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("recent_search");
      jsonValue != null ? setRecords(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const storeKeywords = async (value: Array<string>) => {
    try {
      const set = [...new Set(value)];
      const jsonValue = JSON.stringify(set.length > 6 ? set.splice(1, 6) : set);
      await AsyncStorage.setItem("recent_search", jsonValue);
      getKeywords();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getKeywords();
  }, []);

  return [records, storeKeywords];
}
