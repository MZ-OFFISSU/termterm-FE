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
import { TermSimple } from "Curation";
import { RefreshControl } from "react-native";
import { useBookmarkHeader } from "@hooks/useBookmarkHeader";

export type Props = StackScreenProps<RootStackParamList, "CurationDetail">;

const CurationDetail = ({ navigation, route }: Props) => {
  //아이디로 통신해서 정보 가져올 것
  const { getCurationDetailInfo, curationDetailInfo, buyThisCuration } =
    useCuration();
  const CURATION_ID = route.params.id;
  const [COLOR, mode] = useThemeStyle();
  const [terms, setTerms] = useState<TermSimple[]>();
  const [pay, setPay] = useState(curationDetailInfo?.paid);
  const [modal, setModal] = useState(false);
  const { settingCurationId } = useBookmarkHeader();
  //토스트메시지 보여주는 함수
  const showToast = (res: boolean) => {
    if (res) {
      Toast.show({
        type: mode ? "light" : "dark",
        text1: "이제 마음껏 큐레이션을 볼 수 있어요!",
      });
    } else {
      Toast.show({
        type: mode ? "light" : "dark",
        text1: "큐레이션 구매에 실패했어요.",
      });
    }
  };

  //모달에서 결제버튼 클릭할 때 실행되는 함수
  //TODO 통신해서 해금 넣을 것
  //포인트가 부족한 경우도 있어야함.
  const onPay = async () => {
    const res = await buyThisCuration(CURATION_ID);
    showToast(res);
    if (res) {
      getCurationDetailInfo(CURATION_ID);
      setPay(true);
    }
    setModal(false);
  };

  useEffect(() => {
    settingCurationId(CURATION_ID);
    getCurationDetailInfo(CURATION_ID);
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
        <RelatedTags tags={curationDetailInfo.tags} />
      </Container>
      <CustomModal
        visible={modal}
        title={"큐레이션을 열어볼까요?"}
        subtitle={`500 포인트를 사용하면\n큐레이션의 모든 용어를 볼 수 있어요!`}
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