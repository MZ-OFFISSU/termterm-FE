import HomeApi from "@api/HomeApi";
import { profileState } from "@recoil/signupState";
import { HomeUxWriting, SubTitles } from "Home";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const useHome = () => {
  const homeApi = new HomeApi();
  const [homeMainTitle, setHomeMainTitle] = useState("");
  const [homeSubTitle, setHomeSubTitle] = useState("");
  const [subTitle, setSubTitle] = useState<SubTitles>();
  const profileInfo = useRecoilValue(profileState);

  /** 서브타이틀 리스트 가져오기 */
  const getDBSubTitleList = async () => {
    try {
      const res = await homeApi.getSubTitleList();
      setSubTitle(res);
    } catch (err) {
      console.log(err);
    }
  };

  /** 홈 화면 상단 UX Writing 가져오기 */
  const getHomeUxWriting = async () => {
    try {
      const res: HomeUxWriting = await homeApi.getUxWriting();
      setHomeMainTitle(res.mainTitle);
      setHomeSubTitle(res.subTitle);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHomeUxWriting();
  }, [profileInfo]);

  return {
    getDBSubTitleList,
    getHomeUxWriting,
    subTitle,
    homeMainTitle,
    homeSubTitle
  };
};
