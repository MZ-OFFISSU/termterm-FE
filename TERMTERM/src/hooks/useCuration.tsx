import CurationApi from "@api/CurationApi";
import {
  Category,
  CurationDetail,
  CurationPreview,
  MoreRecommendedCuration,
} from "Curation";
import { useEffect, useState } from "react";

/**
 * 큐레이션 관리 훅
 */
export const useCuration = () => {
  const curationApi = new CurationApi();
  const [arcihivedCurationList, setArchivedCurationList] = useState<
    CurationPreview[]
  >([]);
  const [curationDetailInfo, setCurationDetailInfo] =
    useState<CurationDetail>();
  const [categoryCurationList, setCategoryCurationList] = useState<
    MoreRecommendedCuration[]
  >([]);

  /** 아카이브한 큐레이션 목록 가져오기 */
  const getArchivecurationList = async (): Promise<boolean> => {
    try {
      const res = await curationApi.getArchivedCuration();
      setArchivedCurationList(res);
      console.log("success : ", res);
      return true;
    } catch (err) {
      return false;
    }
  };

  /** 큐레이션 북마크하기 */
  const bookmarkCuration = async (id: number): Promise<boolean> => {
    try {
      const res = await curationApi.curationBookmark(id);
      console.log("특정 큐레이션 북마크 성공 - ID : ", id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 큐레이션 상세 정보 가져오기 */
  const getCurationDetailInfo = async (id: number): Promise<boolean> => {
    try {
      const res = await curationApi.getCurationDetail(id);
      setCurationDetailInfo(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 카테고리별 큐레이션 리스트 가져오기(카테고리 없을 경우 추천 큐레이션) */
  const getEachCategoryCurationList = async (
    category?: Category
  ): Promise<boolean> => {
    try {
      const res = await curationApi.getCurationListByCategory(category!);
      setCategoryCurationList([]);
      setCategoryCurationList(res);
      console.log("success : ", category, res)
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return {
    getArchivecurationList,
    arcihivedCurationList,
    bookmarkCuration,
    getCurationDetailInfo,
    curationDetailInfo,
    getEachCategoryCurationList,
    categoryCurationList,
    setCategoryCurationList,
  };
};
