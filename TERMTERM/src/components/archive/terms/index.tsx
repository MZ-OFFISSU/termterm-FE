import GotoBookmark from "../default";
import { useEffect } from "react";
import FolderList from "./FolderList";
import styled from "styled-components/native";
import { useFolder } from "@hooks/useFolder";
import { UserFolderList } from "Folder";

interface Props {
  type: string;
}

const BookmarkedTerms = ({ type }: Props) => {
  const { getUsersFolderList, myFolderList } = useFolder();

  useEffect(() => {
    getUsersFolderList();
  }, []);

  return (
    <Container>
      {myFolderList?.length === 0 || !myFolderList ? (
        <GotoBookmark type={type} />
      ) : (
        <FolderList folders={myFolderList as UserFolderList[]} />
      )}
    </Container>
  );
};
const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
export default BookmarkedTerms;
