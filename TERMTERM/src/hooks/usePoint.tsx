import PointApi from "@api/PointApi";
import { getAccessToken } from "@utils/tokenHandler";
import { PointHistoryContent } from "Point";
import { useEffect, useState } from "react";

export const usePoint = () => {
  const pointApi = new PointApi();

  const [history, setHistory] = useState<PointHistoryContent[]>([]);
  const [curPoint, setCurPoint] = useState(0);
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

  useEffect(() => {
    getCurPoint();
    getHistoryByPage();
  }, []);

  return { history, isEnd, curPoint };
};
