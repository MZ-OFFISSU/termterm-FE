import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { WordCard } from "@components/terms/";
import { useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import OtherThink from "@components/OtherThink";
import { useTerm } from "@hooks/useTerm";
import { useBookmarkHeader } from "@hooks/useBookmarkHeader";
import { booleanConverter } from "@utils/booleanConverter";
import CustomModal from "@components/popup/modal";

export type Props = StackScreenProps<RootStackParamList, "TermDetail">;

/**
 * 단일 용어 설명 페이지
 */
const TermDetail = ({ navigation, route }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { getTermDetail, termDetail } = useTerm();
  const { setDefaultBookmarkState, isModalOpen, closeModal, setTermId } =
    useBookmarkHeader();

  useEffect(() => {
    setTermId(Number(route.params.id));
    getTermDetail(Number(route.params.id));
  }, [route]);

  useEffect(() => {
    if (termDetail)
      setDefaultBookmarkState(booleanConverter(termDetail.bookmarked));
  }, [termDetail]);

  return (
    <Container COLOR={COLOR}>
      {termDetail ? (
        <>
          <WordCard
            word={termDetail}
            detail={true}
            style={{ width: screenWidth - 32 }}
          />
          <OtherThink word={termDetail} />
        </>
      ) : (
        <></>
      )}
      <CustomModal
        visible={isModalOpen}
        title={"아카이빙 해제는 아카이브 내에서만 가능해요!"}
        subtitle={"해당 용어를 아카이빙 한 폴더를 확인해주세요"}
        btnTitle={["확인"]}
        onNext={closeModal}
      />
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 20px 0px 100px 0px;
`;

export default TermDetail;
