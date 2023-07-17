declare module "Curation" {
  export type CurationPreview = {
    cnt: number;
    curationId: number;
    description: string;
    status: "NO" | "YES";
    title: string;
  };

  type TermSimple = {
    bookmarked: "NO" | "YES";
    description: string;
    id: number;
    name: string;
  };

  type MoreRecommendedCuration = {
    bookmarked: string;
    cnt: number;
    curationId: number;
    description: string;
    title: string;
  };

  export type CurationDetail = {
    bookmarked: "NO" | "YES";
    cnt: number;
    description: string;
    moreRecommendedCurations: MoreRecommendedCuration[];
    paid: boolean;
    tags: string[];
    termSimples: TermSimple[];
    title: string;
  };

  export type Category =
    | "X"
    | "pm"
    | "marketing"
    | "development"
    | "design"
    | "business"
    | "IT";

  export type CreateCuration = {
    categories: string[];
    description: string;
    tags: string[];
    termIds: number[];
    thumbnail: string;
    title: string;
  };
}
