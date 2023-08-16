declare module "Point" {
  export type PointHistory = {
    content: PointHistoryContent[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;
  };

  export type PointHistoryContent = {
    dailyHistories: DailyHistory[];
    date: string;
  };

  type DailyHistory = {
    detail: string;
    point: string;
  };

  type Pageable = {
    page: number;
    size: number;
    sort: string;
  };

  type Sort = {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}
