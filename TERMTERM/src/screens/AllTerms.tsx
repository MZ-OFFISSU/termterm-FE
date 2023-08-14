import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useEffect, useState } from "react";
import { Preview } from "@components/curation/detail/term";
import TermPreviewBox from "@components/curation/detail/term/TermPreviewBox";
import { truncateString } from "@utils/wordCutter";
import { useWordReg } from "@hooks/useWordReg";
import TermApi from "@api/TermApi";
import { TermConfig, TermItem } from "Term";
import { getAccessToken } from "@utils/tokenHandler";
import { useTerm } from "@hooks/useTerm";

export type Props = StackScreenProps<RootStackParamList, "AllTerms">;

/**
 * 용어 전체페이지
 */
const AllTerms = ({ navigation }: Props) => {
  const termApi = new TermApi();
  const { totalTermList, getAllTermList } = useTerm();
  const [COLOR, mode] = useThemeStyle();
  const [termConfig, setTermConfig] = useState<TermConfig>({
    category: "pm",
    page: 3,
    size: 5,
    sort: "YES",
  });

  useEffect(() => {
    getAllTermList(termConfig);
  }, []);

  return (
    <Container COLOR={COLOR}>
      <InnerContainer>
        {totalTermList.map((term) => (
          <TermPreviewBox {...term} key={term.id} />
        ))}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const InnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default AllTerms;

const dummyData: Array<TermItem> = [
  {
    bookmarked: "NO",
    id: 0,
    name: "Scrum :: 스크럼",
    description:
      "애자일 소프트웨어 개발 방법론 종류 중의 하나로 반복적이고 점진적인 개발방식을 취해요. 스크럼의 성공 공식은 다음과 같은 3가지(매 스프린트마다 어쩌구 저쩌구입니다람쥐렁이빨대나무인도)",
  },
  {
    bookmarked: "YES",
    id: 1,
    name: "Scrum :: 스크럼",
    description:
      "애자일 소프트웨어 개발 방법론 종류 중의 하나로 반복적이고 점진적인 개발방식을 취해요. 스크럼의 성공 공식은 다음과 같은 3가지(매 스프린트마다 어쩌구 저쩌구입니다람쥐렁이빨대나무인도)",
  },
  {
    bookmarked: "YES",
    id: 2,
    name: "Scrum :: 스크럼",
    description:
      "애자일 소프트웨어 개발 방법론 종류 중의 하나로 반복적이고 점진적인 개발방식을 취해요. 스크럼의 성공 공식은 다음과 같은 3가지(매 스프린트마다 어쩌구 저쩌구입니다람쥐렁이빨대나무인도)",
  },
  {
    bookmarked: "NO",
    id: 3,
    name: "Scrum :: 스크럼",
    description:
      "애자일 소프트웨어 개발 방법론 종류 중의 하나로 반복적이고 점진적인 개발방식을 취해요. 스크럼의 성공 공식은 다음과 같은 3가지(매 스프린트마다 어쩌구 저쩌구입니다람쥐렁이빨대나무인도)",
  },
];
