import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { RefreshControl, TouchableOpacity } from "react-native";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BookmarkedCurations, BookmarkedTerms } from "@components/archive";
import CustomModal from "@components/popup/modal";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { useFolder } from "@hooks/useFolder";

export type RootProps = StackScreenProps<RootStackParamList, "ToolBar">;

interface Props extends RootProps {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}
const TYPES = ["용어", "큐레이션"];
const TYPES_WRAPPER = [BookmarkedTerms, BookmarkedCurations] as const;

const Archive = ({ modal, setModal, navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [curType, setCurType] = useState(0);
  const CurComponents = TYPES_WRAPPER[curType];
  const { getFolderInfoModal, folderInfoModal } = useFolder();

  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    try {
      getFolderInfoModal();
      setRefresh(false);
    } catch (err) {
      setTimeout(() => {
        setRefresh(false);
      }, 2000);
    }
  }, []);

  //폴더 생성 관련 상태
  const [infoModal, setInfoModal] = useState(false);

  const gotoMakefolder = () => {
    navigation.push("MakeFolder");
    setModal(false);
  };
  const openInfoModal = () => {
    setInfoModal(true);
  };

  /**
   * 폴더 개수가 3개 미만일 때 모달
   */
  const DefaultModal = useCallback(() => {
    return (
      <CustomModal
        visible={modal}
        title={"폴더는 포인트 없이 3개까지 생성할 수 있어요."}
        subtitle={`폴더 생성 가능 횟수 : ${
          folderInfoModal?.systemFolderCreationLimit! -
          folderInfoModal?.currentFolderCount!
        }개`}
        btnTitle={["확인"]}
        onNext={() => gotoMakefolder()}
      />
    );
  }, [folderInfoModal]);

  /**
   * 폴더 개수가 3개 이상일 때 모달
   */
  const PointModal = useCallback(() => {
    return (
      <CustomModal
        visible={modal}
        title={"포인트로 폴더를 추가 하시겠어요?"}
        subtitle={`1000 포인트를 사용하면\n폴더를 추가할 수 있어요!`}
        btnTitle={["아니오", "추가할래요"]}
        onNext={() => gotoMakefolder()}
        onClose={() => setModal(false)}
      />
    );
  }, [folderInfoModal]);

  /**
   * 최대 생성 가능한 폴더가 가득 찼을 때 모달
   */
  const MaxModal = useCallback(() => {
    return (
      <CustomModal
        visible={modal}
        title={"더 많은 폴더가 필요하세요?"}
        subtitle={`현재 폴더 최대 생성 개수는 9개 예요.\n추후 업데이트에 반영할게요!`}
        btnTitle={["괜찮아요", "네, 반영해주세요"]}
        onNext={() => gotoMakefolder()}
        onClose={() => setModal(false)}
      />
    );
  }, [folderInfoModal]);

  useEffect(() => {
    getFolderInfoModal();
  }, []);

  return (
    <>
      <Container
        COLOR={COLOR}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
        }
      >
        <TypeSelector>
          {TYPES.map((type, idx) => (
            <TouchableOpacity
              key={type}
              onPress={() => setCurType(idx)}
              style={{ marginLeft: idx !== 0 ? 15 : 5 }}
            >
              <Type
                selected={curType === idx}
                style={{ color: COLOR.Text.active }}
              >
                {type}
              </Type>
            </TouchableOpacity>
          ))}
        </TypeSelector>
        <InfoCheckbutton onPress={openInfoModal}>
          <AutoSizedImage
            source={require("@assets/icon/folder-info.png")}
            width={24}
            height={24}
          />
        </InfoCheckbutton>
        <CurComponents type={TYPES[curType]} />
      </Container>
      {folderInfoModal?.myFolderCreationLimit! -
        folderInfoModal?.currentFolderCount! >
      0 ? (
        <DefaultModal />
      ) : folderInfoModal?.systemFolderCreationLimit! -
          folderInfoModal?.currentFolderCount! >
        0 ? (
        <PointModal />
      ) : (
        <MaxModal />
      )}
      <CustomModal
        visible={infoModal}
        title={"폴더 관련 정보"}
        subtitle={`현재 폴더 개수 : ${folderInfoModal?.currentFolderCount}개\n나의 폴더 생성 한도 : ${folderInfoModal?.myFolderCreationLimit}개\n생성 가능 폴더 개수 : 최대 ${folderInfoModal?.systemFolderCreationLimit}개`}
        btnTitle={["확인"]}
        onNext={() => setInfoModal(false)}
      />
    </>
  );
};
const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 20px 16px;
`;
const TypeSelector = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const Type = styled.Text<{ selected: boolean }>`
  ${(props) =>
    props.selected ? TYPO_STYLE.Body[2].Bold : TYPO_STYLE.Body[2].Regular};
`;
const InfoCheckbutton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0px;
  right: 0px;
`;
export default Archive;
