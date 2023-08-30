import styled from "styled-components/native";
import Folder from "./Folder";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { UserFolderList } from "Folder";

interface FolderProps extends UserFolderList {
  icon: number;
}
interface Props {
  folders: Array<UserFolderList>;
}

// TODO : props 변경
const FolderList = ({ folders }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Container>
      {folders.map((folder) => (
        <Folder
          onOpen={(id: number) =>
            navigation.push("FolderDetailCollapse", { id: id })
          }
          key={folder.folderId}
          {...folder}
        />
      ))}
    </Container>
  );
};
const Container = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px 0px;
`;
export default FolderList;
