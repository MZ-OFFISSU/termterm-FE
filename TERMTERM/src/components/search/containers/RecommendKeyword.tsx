import { ViewProps } from "react-native";
import {
  ContentsWrapper,
  ContentsHeader,
  RecommendWrapper,
} from "@components/search";
import { useSearch } from "@hooks/useSearch";

const RecommendKeyword = ({ ...props }: ViewProps) => {
  const [records, setRecords] = useSearch();
  return (
    <ContentsWrapper {...props}>
      <ContentsHeader title="추천 검색어" />
      <RecommendWrapper />
    </ContentsWrapper>
  );
};

export default RecommendKeyword;
