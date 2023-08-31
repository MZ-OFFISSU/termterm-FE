import styled from "styled-components/native";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { FolderProps } from "@interfaces/bookmark";
import * as Haptics from "expo-haptics";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { UserFolderList } from "Folder";
import { useFolder } from "@hooks/useFolder";
import CustomModal from "@components/popup/modal";
import { useState } from "react";

interface Props extends UserFolderList {
  onOpen: (id: number) => void;
}

const FOLDER_ICON = [
  require("@assets/folders/light.png"),
  require("@assets/folders/yellow.png"),
  require("@assets/folders/gray.png"),
];

const Folder = ({ onOpen, folderId, title }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [COLOR, mode] = useThemeStyle();
  const { showActionSheetWithOptions } = useActionSheet();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { deleteFolder, getUsersFolderList } = useFolder();

  const DefaultModal = () => {
    return (
      <CustomModal
        visible={isDeleteModalOpen}
        title={"정말로 폴더를 삭제하시겠어요?"}
        subtitle={"폴더를 삭제하면 아카이빙했던\n모든 용어를 확인할 수 없어요."}
        btnTitle={["아니요", "삭제할래요"]}
        onNext={async () => {
          await deleteFolder(folderId);
          await getUsersFolderList();
          setIsDeleteModalOpen(false);
          navigation.navigate("Archive");
        }}
        onClose={() => {
          setIsDeleteModalOpen(false);
          navigation.navigate("Archive");
        }}
      />
    );
  };

  const openActionSheet = () => {
    const options = ["폴더 수정", "폴더 삭제", "취소"];
    const cancelButtonIndex = 2;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            navigation.push("EditFolder", { id: folderId });
            return;
          case 1:
            setIsDeleteModalOpen(true);
            return;
          case cancelButtonIndex:
            return;
          // 닫기
        }
      }
    );
  };

  return (
    <FolderWrapper
      onPress={() => onOpen(folderId)}
      onLongPress={openActionSheet}
    >
      {isDeleteModalOpen && <DefaultModal />}
      {/* TODO : Icon 색상 기준 따라 반영 */}
      <AutoSizedImage source={FOLDER_ICON[1]} width={90} />
      <FolderInfo COLOR={COLOR}>{title}</FolderInfo>
    </FolderWrapper>
  );
};

const FolderWrapper = styled.TouchableOpacity`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 7px;
`;

const FolderInfo = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
  margin-top: 10px;
`;

export default Folder;
