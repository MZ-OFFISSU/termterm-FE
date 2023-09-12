import {
  CurationDetail,
  CurationPreview,
  MoreRecommendedCuration,
} from "Curation";
import { atom } from "recoil";

const emptyCurationDetail: CurationDetail = {
  bookmarked: "NO",
  cnt: 0,
  description: "",
  moreRecommendedCurations: [],
  paid: false,
  tags: [],
  termSimples: [],
  title: "",
  thumbnail: "",
};

/** 큐레이션 관련 상태 */
export const curationDetailState = atom<CurationDetail>({
  key: "curationDetailState",
  default: emptyCurationDetail,
});

/** 큐레이션 리스트 상태 */
export const curationListState = atom<MoreRecommendedCuration[]>({
  key: "curationListState",
  default: [],
});

/** 아카이브한 큐레이션 상태 */
export const archivedCurationListState = atom<CurationPreview[]>({
  key: "archivedCurationList",
  default: [],
});
