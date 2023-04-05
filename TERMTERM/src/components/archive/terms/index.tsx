import GotoBookmark from "../default";
import { FolderProps } from "@interfaces/bookmark";
import { useState } from "react";
import FolderList from "./FolderList";
import styled from "styled-components/native";

interface Props {
  type: string;
}

const BookmarkedTerms = ({ type }: Props) => {
  const [folders, setFolders] = useState<Array<FolderProps>>(dummyData);
  return (
    <Container>
      {folders.length === 0 ? (
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
const dummyData: Array<FolderProps> = [
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
