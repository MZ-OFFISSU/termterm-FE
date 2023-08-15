import { ViewProps } from "react-native";
import {
  ContentsWrapper,
  ContentsHeader,
  RecommendWrapper,
} from "@components/search";

interface Props extends ViewProps {
  handleRecommendKeyword: (recommend: string) => void;
}

const RecommendKeyword = ({ handleRecommendKeyword, ...props }: Props) => {
  return (
    <ContentsWrapper {...props}>
      <ContentsHeader title="추천 검색어" />
      <RecommendWrapper handleRecommendKeyword={handleRecommendKeyword} />
    </ContentsWrapper>
  );
};

export default RecommendKeyword;
