import { ViewProps } from "react-native";
import { ContentsWrapper, ContentsHeader } from "@components/search";
import { CurationItem } from "@components/curation";
import { CurationItemProps } from "@interfaces/curation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useCuration } from "@hooks/useCuration";
import { useEffect } from "react";
import { useMember } from "@hooks/useMember";
import { Category } from "Curation";

interface Props extends ViewProps {
  navigation: StackNavigationProp<RootStackParamList, "ToolBar", undefined>;
}

const RecommendList = ({ navigation, ...props }: Props) => {
  const { getEachCategoryCurationList, categoryCurationList } = useCuration();
  const { user } = useMember();

  useEffect(() => {
    getEachCategoryCurationList(
      user.info?.categories[0].toLowerCase() as Category
    );
  }, []);

  return (
    <ContentsWrapper {...props}>
      <ContentsHeader title="추천 모음집" />
      {categoryCurationList.map((item, idx) => (
        <CurationItem
          item={item}
          img={item.thumbnail}
          onMove={() =>
            navigation.push("CurationDetail", { id: item.curationId })
          }
          key={item.thumbnail}
          style={idx !== 0 ? { marginTop: 30 } : {}}
        />
      ))}
    </ContentsWrapper>
  );
};

export default RecommendList;
