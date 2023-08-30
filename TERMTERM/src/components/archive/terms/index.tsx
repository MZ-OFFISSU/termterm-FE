import GotoBookmark from "../default";
import { useEffect, useState } from "react";
import FolderList from "./FolderList";
import styled from "styled-components/native";
import { useFolder } from "@hooks/useFolder";
import { UserFolderList } from "Folder";

interface Props {
  type: string;
}

const BookmarkedTerms = ({ type }: Props) => {
  const { getUsersFolderList, myFolderList } = useFolder();
  const [folders, setFolders] = useState<Array<UserFolderList>>(dummyData);

  useEffect(() => {
    getUsersFolderList();
    // TODO : 폴더 리스트 불러오기 관련 버그 잡기
    // setFolders(myFolderList as UserFolderList[]);
    console.log(
      "my folder list : ",
      myFolderList,
      "folder list : ",
      folders,
      myFolderList?.length
    );
  }, []);

  return (
    <Container>
      {folders?.length === 0 ? (
        <GotoBookmark type={type} />
      ) : (
        <FolderList folders={folders} />
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

//더미데이터
const dummyData: Array<UserFolderList> = [
  {
    folderId: 0,
    title: "기획",
    description: "기획과 관련된 폴더입니다.",
  },
  {
    folderId: 1,
    title: "프론트엔드 개발",
    description: "프론트엔드 개발과 관련된 폴더입니다.",
  },
  {
    folderId: 2,
    title: "백엔드 개발",
    description: "백엔드 개발과 관련된 폴더입니다.",
  },
  {
    folderId: 3,
    title: "디자인",
    description: "디자인과 관련된 폴더입니다.",
  },
];

const oldDummyData = [
  {
    id: 0,
    name: "기획",
    desc: "기획자를 위한 폴더입니당구리.",
    icon: 0,
    terms: [
      {
        id: 0,
        term: "개발자",
      },
      {
        id: 1,
        term: "루시",
      },
      {
        id: 2,
        term: "최상엽",
      },
      {
        id: 3,
        term: "신예찬",
      },
      {
        id: 4,
        term: "조원상",
      },
      {
        id: 5,
        term: "신광일",
      },
    ],
  },
  {
    id: 1,
    name: "기획",
    desc: "기획자를 위한 폴더입니당구리.",
    icon: 1,
    terms: [
      {
        id: 0,
        term: "개발자",
      },
      {
        id: 1,
        term: "루시",
      },
      {
        id: 2,
        term: "최상엽",
      },
      {
        id: 3,
        term: "신예찬",
      },
      {
        id: 4,
        term: "조원상",
      },
      {
        id: 5,
        term: "신광일",
      },
    ],
  },
  {
    id: 2,
    name: "기획",
    desc: "기획자를 위한 폴더입니당구리.",
    icon: 2,
    terms: [
      {
        id: 0,
        term: "개발자",
      },
      {
        id: 1,
        term: "루시",
      },
      {
        id: 2,
        term: "최상엽",
      },
      {
        id: 3,
        term: "신예찬",
      },
      {
        id: 4,
        term: "조원상",
      },
      {
        id: 5,
        term: "신광일",
      },
    ],
  },
];
