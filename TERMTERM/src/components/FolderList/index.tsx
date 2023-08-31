import AutoSizedImage from "@components/common/AutoSizedImage";
import { useArchive } from "@hooks/useArchive";
import { useFolder } from "@hooks/useFolder";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import { useEffect } from "react";
import styled from "styled-components/native";

interface Props {
  handleCanNext: (check: boolean) => void;
}

const FOLDER_ICON = [
  require("@assets/folders/light.png"),
  require("@assets/folders/yellow.png"),
  require("@assets/folders/gray.png"),
];

const FolderList = ({ handleCanNext }: Props) => {
  const { myFolderList, selectedFolders, handleSelectFolder } = useArchive();
  const [COLOR, mode] = useThemeStyle();

  const curFolderImg = (fId: number) => {
    if (selectedFolders.includes(fId)) return FOLDER_ICON[1];
    if (mode) return FOLDER_ICON[0];
    return FOLDER_ICON[2];
  };

  useEffect(() => {
    if (selectedFolders.length === 0) handleCanNext(false);
    else handleCanNext(true);
  }, [selectedFolders]);

  return (
    <Container>
      {myFolderList?.map((folder) => (
        <FolderWrapper onPress={() => handleSelectFolder(folder.folderId)}>
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
`;

const FolderInfo = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
  margin-top: 10px;
`;

export default FolderList;
