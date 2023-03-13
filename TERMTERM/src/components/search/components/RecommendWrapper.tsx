import styled from "styled-components/native";
import Recommend from "./Recommend";
import { useSearch } from "@hooks/useSearch";

const RecommendList = [
  "비즈니스",
  "기획자",
  "IT",
  "개발자",
  "UX",
  "회사",
  "데이터",
  "디자이너",
];

const RecommendWrapper = () => {
  const [records, setRecords] = useSearch();

  return (
    <Container>
      {RecommendList.map((rec, idx) => (
        <Recommend
          title={rec}
          key={`${rec}_${idx}`}
          onPress={() => setRecords([...records, rec])}
        />
      ))}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default RecommendWrapper;
