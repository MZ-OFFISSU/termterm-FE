import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookmarkBar } from "@components/header";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { CurationItemProps } from "@interfaces/curation";
import {
  TitleBox,
  TermPreview,
  RecommendCuration,
  RelatedTags,
} from "@components/curation/detail";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import CustomModal from "@components/popup/modal";

export type Props = StackScreenProps<RootStackParamList, "CurationDetail">;

const CurationDetail = ({ navigation, route }: Props) => {
  //아이디로 통신해서 정보 가져올 것
  const CURATION_ID = route.params.id;
  const [COLOR, mode] = useThemeStyle();
  const [terms, setTerms] = useState(dummyData.terms);
  const [pay, setPay] = useState(dummyData.pay);
  const [modal, setModal] = useState(false);

  //토스트메시지 보여주는 함수
  const showToast = () => {
    Toast.show({
      type: "light",
      text1: "이제 마음껏 큐레이션을 볼 수 있어요!😍",
    });
  };

  //모달에서 결제버튼 클릭할 때 실행되는 함수
  //TODO 통신해서 해금 넣을 것
  //포인트가 부족한 경우도 있어야함.
  const onPay = () => {
    showToast();
    setModal(false);
    setPay(true);
  };

  //결제 여부에 따라서 온오프가 변경됨.
  //추후 백엔드와 논의가 필요함
  useEffect(() => {
    if (pay) setTerms(dummyData.terms);
    else setTerms(dummyData.terms.slice(0, 5));
  }, [pay]);

  //추천 큐레이션 미리보기에서 -> 해당 큐레이션으로 이동하는 함수
  const onNavigate = (id: number) => {};

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
        <TermPreview items={terms} pay={pay} onPay={() => setModal(true)} />
        <RecommendCuration items={dummyCuration} onNavigate={onNavigate} />
        <RelatedTags tags={dummyData.tags} />
      </Container>
      <CustomModal
        visible={modal}
        title={"큐레이션을 열까요?"}
        subtitle={`50 포인트를 사용하면\n큐레이션의 모든 용어를 볼 수 있어요!`}
        btnTitle={["아니오", "더 볼래요"]}
        onClose={() => setModal(false)}
        onNext={() => onPay()}
      />
    </SafeAreaView>
  );
};

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

export default CurationDetail;

// 더미데이터들
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
  pay: false,
  cuations: dummyCuration,
  tags: ["기획자", "IT", "트렌드"],
};
