import { CurationItemProps } from "@interfaces/curation";
import { ContentsWrapper, ContentsHeader } from "@components/search";
import CurationItem from "@components/curation/CurationItem";
import { MoreRecommendedCuration } from "Curation";

interface Props {
  items: Array<MoreRecommendedCuration>;
  onNavigate: (id: number) => void;
}

/**
 * 큐레이션 디테이 내부에서 추천 큐레이션을 보여주고
 * 해당 큐레이션으로 이동할 수 있는 래퍼 컴포넌트
 */
const RecommendCuration = ({ items, onNavigate }: Props) => {
  return (
    <ContentsWrapper
      style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 30 }}
    >
      <ContentsHeader title={"함께 보면 더 좋은 용어 모음집"} />
      {items.map((item, idx) => (
        <CurationItem
          {...item}
          onMove={onNavigate}
          key={item.curationId}
          style={idx !== 0 ? { marginTop: 30 } : {}}
        />
      ))}
    </ContentsWrapper>
  );
};

export default RecommendCuration;
