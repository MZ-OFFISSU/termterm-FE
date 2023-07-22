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

  return { filterArr, dynamicFilterArr, settingFilter, saveFilter };
}
