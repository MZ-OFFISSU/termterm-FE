import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { CurationItemProps } from "@interfaces/curation";
import {
  TitleBox,
  TermPreview,
  RecommendCuration,
  RelatedTags,
} from "@components/curation/detail";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import CustomModal from "@components/popup/modal";
import { colorTheme } from "@style/designSystem";
import { useCuration } from "@hooks/useCuration";
import { MoreRecommendedCuration, TermSimple } from "Curation";
import { RefreshControl } from "react-native";

export type Props = StackScreenProps<RootStackParamList, "CurationDetail">;

const CurationDetail = ({ navigation, route }: Props) => {
  //아이디로 통신해서 정보 가져올 것
  const { getCurationDetailInfo, curationDetailInfo } = useCuration();
  const CURATION_ID = route.params.id;
  const [COLOR, mode] = useThemeStyle();
  const [terms, setTerms] = useState<TermSimple[]>();
  const [pay, setPay] = useState(curationDetailInfo?.paid);
  const [modal, setModal] = useState(false);

  //토스트메시지 보여주는 함수
  const showToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "이제 마음껏 큐레이션을 볼 수 있어요!",
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

  useEffect(() => {
    getCurationDetailInfo(CURATION_ID);
    // console.log("first curation detail info : ", curationDetailInfo)
    setTerms(curationDetailInfo?.termSimples);
  }, []);

  //결제 여부에 따라서 온오프가 변경됨.
  //추후 백엔드와 논의가 필요함
  useEffect(() => {
    if (pay) setTerms(curationDetailInfo?.termSimples);
    else setTerms(curationDetailInfo?.termSimples.slice(0, 5));
  }, [pay]);

  //추천 큐레이션 미리보기에서 -> 해당 큐레이션으로 이동하는 함수
  const onNavigate = (id: number) => {
    navigation.push("CurationDetail", { id: id });
  };

  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    try {
      getCurationDetailInfo(CURATION_ID);
      setTerms(curationDetailInfo?.termSimples);
      setRefresh(false);
    } catch (err) {
      setTimeout(() => {
        setRefresh(false);
      }, 2000);
    }
  }, []);
  return (
    <>
      <Container
        COLOR={COLOR}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
        }
      >
        <TitleBox
          thumbnail={curationDetailInfo?.thumbnail as string}
          title={curationDetailInfo?.title as string}
          subtitle={curationDetailInfo?.description as string}
          termCnt={curationDetailInfo?.cnt as number}
        />
        {curationDetailInfo && (
          <>
            <TermPreview
              items={curationDetailInfo.termSimples}
              pay={curationDetailInfo.paid}
              onPay={() => setModal(true)}
            />
            <RecommendCuration
              items={curationDetailInfo.moreRecommendedCurations}
              onNavigate={onNavigate}
            />
          </>
        )}
        <RelatedTags tags={dummyData.tags} />
      </Container>
      <CustomModal
        visible={modal}
        title={"큐레이션을 열어볼까요?"}
        subtitle={`50 포인트를 사용하면\n큐레이션의 모든 용어를 볼 수 있어요!`}
        btnTitle={["아니오", "더 볼래요"]}
        onClose={() => setModal(false)}
        onNext={() => onPay()}
      />
    </>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
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
  termSimples: [
    {
      bookmarked: "NO",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      id: 0,
      name: "기획자",
    },
    {
      bookmarked: "NO",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      id: 1,
      name: "기획자",
    },
    {
      bookmarked: "NO",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      id: 2,
      name: "기획자",
    },
    {
      bookmarked: "NO",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      id: 3,
      name: "기획자",
    },
    {
      bookmarked: "NO",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      id: 4,
      name: "기획자",
    },
    {
      bookmarked: "NO",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      id: 5,
      name: "기획자",
    },
    {
      id: 6,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: "NO",
    },
    {
      bookmarked: "NO",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      id: 7,
      name: "기획자",
    },
  ],
  paid: true,
  cuations: dummyCuration,
  tags: ["기획자", "IT", "트렌드"],
};
