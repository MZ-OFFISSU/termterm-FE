import CurationApi from "@api/CurationApi";
import {
  archivedCurationListState,
  curationDetailState,
  curationListState,
} from "@recoil/curationState";
import {
  Category,
  CurationDetail,
  CurationPreview,
  MoreRecommendedCuration,
} from "Curation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

/**
 * 큐레이션 관리 훅
 */
export const useCuration = () => {
  const curationApi = new CurationApi();
  const [arcihivedCurationList, setArchivedCurationList] = useRecoilState(
    archivedCurationListState
  );
  const [curationDetailInfo, setCurationDetailInfo] =
    useRecoilState(curationDetailState);
  const [categoryCurationList, setCategoryCurationList] =
    useRecoilState(curationListState);

  /** 아카이브한 큐레이션 목록 가져오기 */
  const getArchivecurationList = async (): Promise<boolean> => {
    try {
      const res = await curationApi.getArchivedCuration();
      setArchivedCurationList(res);
      return true;
    } catch (err) {
      return false;
    }
  };

  /** 큐레이션 북마크하기 */
  const bookmarkCuration = async (id: number): Promise<boolean> => {
    try {
      await curationApi.curationBookmark(id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 큐레이션 북마크취소 */
  const deleteCurationBookmark = async (id: number): Promise<boolean> => {
    try {
      await curationApi.cancelBookmarkCuration(id);
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
      console.log(res);
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
    deleteCurationBookmark,
  };
};
