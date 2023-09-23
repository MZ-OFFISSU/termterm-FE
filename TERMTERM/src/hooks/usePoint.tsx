import PointApi from "@api/PointApi";
import { pointState } from "@recoil/pointState";
import { PointHistoryContent } from "Point";
import { useState } from "react";
import { useRecoilState } from "recoil";

export const usePoint = () => {
  const pointApi = new PointApi();

  const [history, setHistory] = useState<PointHistoryContent[]>([]);
  const [curPoint, setCurPoint] = useRecoilState(pointState);
  const [curPage, setCurPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const getCurPoint = async () => {
    try {
      const data = await pointApi.getCurPoint();
      setCurPoint(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getHistoryByPage = async () => {
    try {
      const data = await pointApi.getPointHistory(curPage);
      if (!data) return;
      setHistory((prev) => [...prev, ...data.content]);
      if (data.empty || data.numberOfElements < 5) setIsEnd(true);
      else setCurPage((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return { history, isEnd, curPoint, getCurPoint, getHistoryByPage };
};
