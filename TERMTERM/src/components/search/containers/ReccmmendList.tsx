import { ViewProps } from "react-native";
import { ContentsWrapper, ContentsHeader } from "@components/search";
import { CurationItem, CurationSelector } from "@components/curation";
import { CurationItemProps } from "@interfaces/curation";

const dummy: Array<CurationItemProps> = [
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/736x/4b/bb/5a/4bbb5aec811322f1bd75dec7f860d251.jpg",
    counts: 30,
    marked: true,
  },
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/564x/bc/0d/10/bc0d109e5e3df2a7d30298fe094c9e7a.jpg",
    counts: 30,
    marked: false,
  },
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/564x/1f/54/54/1f54548fb67b7c0e449c86625708eafe.jpg",
    counts: 30,
    marked: false,
  },
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/564x/40/c0/60/40c060565d91ce3129ac3f793cffb123.jpg",
    counts: 30,
    marked: false,
  },
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/736x/e1/28/3f/e1283f0f99784ca39e96c1c1ac852b0f.jpg",
    counts: 30,
    marked: false,
  },
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/736x/c9/42/af/c942af268f1b8d836ab39f0846e0a745.jpg",
    counts: 30,
    marked: false,
  },
];

const RecommendList = ({ ...props }: ViewProps) => {
  return (
    <ContentsWrapper {...props}>
      <ContentsHeader title="추천 모음집" />
      {dummy.map((item, idx) => (
        <CurationItem
          {...item}
          key={item.img}
          style={idx !== 0 ? { marginTop: 20 } : {}}
        />
      ))}
    </ContentsWrapper>
  );
};

export default RecommendList;
