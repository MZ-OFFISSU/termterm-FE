import { useEffect, useState } from "react";
import styled from "styled-components/native";
import DailyTermBox from "./DailyTermBox";
import { Preview } from "@components/curation/detail/term";
import { TermItem } from "Term";
import TermApi from "@api/TermApi";
import { useTerm } from "@hooks/useTerm";

/**
 * 오늘의 용어 콘테이너
 */
const DailyTermContainer = () => {
  const termApi = new TermApi();
  const {dailyTermList, getDailyTerm} = useTerm();

  const dummy: TermItem[] = [
    {
      bookmarked: "NO",
      description: "이것은 유지민입니다.",
      id: 1,
      name: "유지민",
    },
    {
      bookmarked: "YES",
      description: "이것은 유짐인입니다.",
      id: 2,
      name: "유짐인",
    },
    {
      bookmarked: "YES",
      description: "이것은 짐인유입니다.",
      id: 3,
      name: "짐인유",
    },
    {
      bookmarked: "NO",
      description: "이것은 지민지민유짐인입니다.",
      id: 4,
      name: "지민지민유짐인",
    },
  ]

  useEffect(() => {
    getDailyTerm();
  }, []);

  return (
    <Container>
      {/* TODO : 렌더링 데이터 바꾸기 */}
      {dummy.map((term) => (
        <DailyTermBox {...term} key={term.id} />
      ))}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export default DailyTermContainer;
