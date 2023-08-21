import { FolderProps } from "@interfaces/bookmark";
import styled from "styled-components/native";
import Folder from "./Folder";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

interface Props {
  folders: Array<FolderProps>;
}

const FolderList = ({ folders }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Container>
      {folders.map((folder) => (
        <Folder
          onOpen={(id: number) =>
            navigation.push("FolderDetailCollapse", { id: id })
          }
          key={folder.id}
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
