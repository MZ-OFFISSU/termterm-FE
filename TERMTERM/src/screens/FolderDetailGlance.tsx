import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { FolderDetailProps } from "@interfaces/folderDetail";
import TermDetailGlance from "@components/folder/glance";
import { useModal } from "@hooks/useModal";
import HeaderModal from "@components/common/HeaderModal";
import Empty from "@components/folder/empty";
import { useEffect, useState } from "react";
import Coachmark from "@components/popup/coach";
import { useCoach } from "@hooks/useCoach";
import { useArchive } from "@hooks/useArchive";

export type Props = StackScreenProps<RootStackParamList, "FolderDetailGlance">;

/**
 * 폴더 상세페이지 -> 한눈에보기
 */
const FolderDetailGlance = ({ navigation, route }: Props) => {
  /**폴더 아이디로 통신해서 정보 가져오기 */
  const FOLDER_ID = route.params.id;
  const [COLOR, mode] = useThemeStyle();
  const [modal, setModal] = useModal();
  const coachConfigs = useCoach();
  const { folderInfo, getTermsSuminFolder, termsSum } = useArchive();

  useEffect(() => {
    getTermsSuminFolder(route.params.id);
    coachConfigs.openCoach("folder");
  }, []);

  return (
    <ModalBackground onPress={() => setModal(false)}>
      <Container COLOR={COLOR}>
        {termsSum && termsSum.terms.length > 0 ? (
          <>
            <TitleBox>
              <Title COLOR={COLOR}>{folderInfo.name}</Title>
              <Subtitle COLOR={COLOR}>{folderInfo.desc}</Subtitle>
            </TitleBox>
            <TermDetailGlance terms={termsSum} />
            {modal ? <HeaderModal id={FOLDER_ID} /> : <></>}
          </>
        ) : (
          <>
            <Empty title={folderInfo.name} subtitle={folderInfo.desc} />
            {modal ? <HeaderModal id={FOLDER_ID} /> : <></>}
          </>
        )}
        <Coachmark type="collapse" {...coachConfigs} />
      </Container>
    </ModalBackground>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 0px 16px;
  position: relative;
`;

const ModalBackground = styled.TouchableWithoutFeedback`
  width: 100%;
  height: 100%;
`;

const TitleBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[2].Regular};
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 10px;
`;

export default FolderDetailGlance;
