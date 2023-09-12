import { filterState } from "@recoil/filterState";
import { useState } from "react";
import { useRecoilState } from "recoil";

export function useFilter() {
  const [filterArr, setFilterArr] = useRecoilState(filterState);
  const [dynamicFilterArr, setDynamicFilterArr] = useState(filterArr);

  /** 저장 전, 필터 선택 */
  const settingFilter = (job: string) => {
    if (dynamicFilterArr.includes(job))
      setDynamicFilterArr(dynamicFilterArr.filter((j) => j !== job));
    else if (dynamicFilterArr.length < 4)
      setDynamicFilterArr((prev) => [...prev, job]);
  };

  /** 필터 저장 */
  const saveFilter = () => {
    setFilterArr(dynamicFilterArr);
  };

  const converter = (job: string) => {
    switch (job) {
      case "기획":
        return "pm";
      case "마케팅":
        return "marketing";
      case "개발":
        return "development";
      case "디자인":
        return "design";
      case "비즈니스":
        return "business";
      case "IT":
        return "IT";
      default:
        return "IT";
    }
  };

  return { filterArr, dynamicFilterArr, settingFilter, saveFilter, converter };
}
