import { useEffect, useState } from "react";
import styled from "styled-components/native";
import DailyTermBox from "./DailyTermBox";
import TermApi from "@api/TermApi";
import { useTerm } from "@hooks/useTerm";

/**
 * 오늘의 용어 콘테이너
 */
const DailyTermContainer = () => {
  const {dailyTermList, getDailyTerm} = useTerm();

  useEffect(() => {
    getDailyTerm();
  }, []);

  return (
    <Container>
      {dailyTermList.map((term) => (
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
