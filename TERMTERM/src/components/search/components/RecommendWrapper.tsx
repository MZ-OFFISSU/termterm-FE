import styled from "styled-components/native";
import Recommend from "./Recommend";
import { useHaptics } from "@hooks/useHaptics";

const RecommendList = [
  "비즈니스",
  "디자인",
  "개발",
  "UX",
  "메뉴",
  "블록체인",
  "데이터",
  "user",
];

interface Props {
  handleRecommendKeyword: (recommend: string) => void;
}

const RecommendWrapper = ({ handleRecommendKeyword }: Props) => {
  const { haptic } = useHaptics();

  const recommend = (rec: string) => {
    handleRecommendKeyword(rec);
    haptic("light");
  };

  return (
    <Container>
      {RecommendList.map((rec, idx) => (
        <Recommend
          title={rec}
          key={`${rec}_${idx}`}
          onPress={() => recommend(rec)}
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
