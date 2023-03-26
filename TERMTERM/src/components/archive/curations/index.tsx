import GotoBookmark from "../default";

interface Props {
  type: string;
}

const BookmarkedCurations = ({ type }: Props) => {
  return (
    <>
      <GotoBookmark type={type} />
    </>
  );
};

export default BookmarkedCurations;
