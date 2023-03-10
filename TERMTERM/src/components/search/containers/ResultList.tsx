import { ViewProps } from "react-native";
import {
  ContentsWrapper,
  ContentsHeader,
  ResultWrapper,
} from "@components/search";

const dummyResults = ["기획", "기획", "기획"];

const ResultList = ({ ...props }: ViewProps) => {
  return (
    <ContentsWrapper {...props}>
      <ContentsHeader title="용어" style={{ marginBottom: 8 }} />
      <ResultWrapper results={dummyResults} />
    </ContentsWrapper>
  );
};

export default ResultList;
