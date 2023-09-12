import GotoBookmark from "../default";
import { CurationItemProps } from "@interfaces/curation";
import CurationsSelector from "./CurationsSelector";
import { useCuration } from "@hooks/useCuration";
import { useEffect } from "react";

interface Props {
  type: string;
}

const BookmarkedCurations = ({ type }: Props) => {
  const { arcihivedCurationList, getArchivecurationList } = useCuration();

  useEffect(() => {
    getArchivecurationList();
  }, []);

  return (
    <>
      {arcihivedCurationList.length > 0 ? (
        <CurationsSelector />
      ) : (
        <GotoBookmark type={type} />
      )}
    </>
  );
};

export default BookmarkedCurations;
