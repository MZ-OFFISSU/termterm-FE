import FolderApi from "@api/FolderApi";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import { UserFolderList } from "Folder";
import { useEffect, useState } from "react";
import styled from "styled-components/native";

interface Props {
  myFolderList: UserFolderList[];
  selectedFolders: number[];
  handleSelectFolder: (folderId: number) => void;
  termId: number;
}

const FOLDER_ICON = [
  require("@assets/folders/light.png"),
  require("@assets/folders/yellow.png"),
  require("@assets/folders/gray.png"),
];

const FolderList = ({
  myFolderList,
  selectedFolders,
  handleSelectFolder,
  termId,
}: Props) => {
  const folderApi = new FolderApi();
  const [COLOR, mode] = useThemeStyle();
  const [disabledFolders, setDisabledFolders] = useState<number[]>([]);

  const curFolderImg = (fId: number) => {
    if (selectedFolders.includes(fId)) return FOLDER_ICON[1];
    if (mode) return FOLDER_ICON[0];
    return FOLDER_ICON[2];
  };

  const isInWord = async (folderId: number) => {
    try {
      const res = await folderApi.isIncludeWordInFolder(folderId, termId);
      return res.isExist;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    const checkFolders = async () => {
      const disableds: number[] = [];

      for (let folder of myFolderList) {
        if (await isInWord(folder.folderId)) {
          disableds.push(folder.folderId);
        }
      }

      setDisabledFolders(disableds);
    };

    checkFolders();
  }, [myFolderList, termId]);

  return (
    <Container>
      {myFolderList?.map((folder) => (
        <FolderWrapper
          disabled={disabledFolders.includes(folder.folderId)}
          onPress={() => handleSelectFolder(folder.folderId)}
        >
          <AutoSizedImage source={curFolderImg(folder.folderId)} width={90} />
          <FolderInfo COLOR={COLOR}>{folder.title}</FolderInfo>
        </FolderWrapper>
      ))}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px 0px;
`;

const FolderWrapper = styled.TouchableOpacity`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 7px;
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
`;

const FolderInfo = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
  margin-top: 10px;
`;

export default FolderList;
