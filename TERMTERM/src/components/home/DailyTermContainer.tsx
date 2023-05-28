import { useState } from "react";
import styled from "styled-components/native";
import DailyTermBox from "./DailyTermBox";
import { Preview } from "@components/curation/detail/term";

const dummyData: Array<Preview> = [
  {
    bookmarked: false,
    id: 0,
    name: "Scrum :: 스크럼",
    description:
      "애자일 소프트웨어 개발 방법론 종류 중의 하나로 반복적이고 점진적인 개발방식을 취해요. 스크럼의 성공 공식은 다음과 같은 3가지(매 스프린트마다 어쩌구 저쩌구입니다람쥐렁이빨대나무인도)",
  },
  {
    bookmarked: true,
    id: 1,
    name: "Scrum :: 스크럼",
    description:
      "애자일 소프트웨어 개발 방법론 종류 중의 하나로 반복적이고 점진적인 개발방식을 취해요. 스크럼의 성공 공식은 다음과 같은 3가지(매 스프린트마다 어쩌구 저쩌구입니다람쥐렁이빨대나무인도)",
  },
  {
    bookmarked: false,
    id: 2,
    name: "Scrum :: 스크럼",
    description:
      "애자일 소프트웨어 개발 방법론 종류 중의 하나로 반복적이고 점진적인 개발방식을 취해요. 스크럼의 성공 공식은 다음과 같은 3가지(매 스프린트마다 어쩌구 저쩌구입니다람쥐렁이빨대나무인도)",
  },
  {
    bookmarked: true,
    id: 3,
    name: "Scrum :: 스크럼",
    description:
      "애자일 소프트웨어 개발 방법론 종류 중의 하나로 반복적이고 점진적인 개발방식을 취해요. 스크럼의 성공 공식은 다음과 같은 3가지(매 스프린트마다 어쩌구 저쩌구입니다람쥐렁이빨대나무인도)",
  },
];

/**
 * 오늘의 용어 콘테이너
 */
const DailyTermContainer = () => {
  const [terms, setTerms] = useState(dummyData);

  return (
    <Container>
      {terms.map((term) => (
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
