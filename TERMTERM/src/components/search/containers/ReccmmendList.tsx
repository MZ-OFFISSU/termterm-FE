import { ViewProps } from "react-native";
import { ContentsWrapper, ContentsHeader } from "@components/search";
import { CurationItem } from "@components/curation";
import { CurationItemProps } from "@interfaces/curation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useCuration } from "@hooks/useCuration";
import { useEffect } from "react";

interface Props extends ViewProps {
  navigation: StackNavigationProp<RootStackParamList, "ToolBar", undefined>;
}

const dummy: Array<CurationItemProps> = [
  {
    id: 0,
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/736x/4b/bb/5a/4bbb5aec811322f1bd75dec7f860d251.jpg",
    counts: 30,
    marked: true,
  },
  {
    id: 1,
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/564x/bc/0d/10/bc0d109e5e3df2a7d30298fe094c9e7a.jpg",
    counts: 30,
    marked: false,
  },
  {
    id: 2,
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/564x/1f/54/54/1f54548fb67b7c0e449c86625708eafe.jpg",
    counts: 30,
    marked: false,
  },
  {
    id: 3,
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/564x/40/c0/60/40c060565d91ce3129ac3f793cffb123.jpg",
    counts: 30,
    marked: false,
  },
  {
    id: 4,
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/736x/e1/28/3f/e1283f0f99784ca39e96c1c1ac852b0f.jpg",
    counts: 30,
    marked: false,
  },
  {
    id: 5,
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/736x/c9/42/af/c942af268f1b8d836ab39f0846e0a745.jpg",
    counts: 30,
    marked: false,
  },
];

const RecommendList = ({ navigation, ...props }: Props) => {
  const { getEachCategoryCurationList, categoryCurationList } = useCuration();

  useEffect(() => {
    // TODO : 임시 카테고리 변경
    getEachCategoryCurationList("development");
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
