import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookmarkBar } from "@components/header";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { CurationItemProps } from "@interfaces/curation";
import { TitleBox } from "@components/curation/detail";
import TermPreview from "@components/curation/detail/term";

export type Props = StackScreenProps<RootStackParamList, "CurationDetail">;

const dummyCuration: Array<CurationItemProps> = [
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
];

const dummyData = {
  id: 0,
  thumbnail:
    "https://i.pinimg.com/564x/dc/2e/4c/dc2e4c113d3cf5c25870895ea2aeab08.jpg",
  title: "기획자에게 필요한 용어 모음집",
  subtitle: "기획자가 꼭 알아야하고 필요한 용어만을 선별했어요!",
  terms: [
    {
      id: 0,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: false,
    },
    {
      id: 1,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
    },
    {
      id: 2,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: false,
    },
    {
      id: 3,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
    },
    {
      id: 4,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: false,
    },
    {
      id: 5,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
    },
    {
      id: 6,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: false,
    },
    {
      id: 7,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
    },
  ],
  cuations: dummyCuration,
  tags: ["기획자", "IT", "트렌드"],
};

const CurationDetail = ({ navigation, route }: Props) => {
  //아이디로 통신해서 정보 가져올 것
  const CURATION_ID = route.params.id;
  const [COLOR] = useThemeStyle();

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container stickyHeaderIndices={[0]}>
        <BookmarkBar
          onBack={() => navigation.pop()}
          onBookmark={() => null}
          onShare={() => null}
          bookmarked={false}
        />
        <TitleBox
          thumbnail={dummyData.thumbnail}
          title={dummyData.title}
          subtitle={dummyData.subtitle}
          termCnt={dummyData.terms.length}
        />
        <TermPreview items={dummyData.terms} />
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

export default CurationDetail;
