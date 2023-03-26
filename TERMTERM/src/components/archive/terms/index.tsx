import GotoBookmark from "../default";

interface Props {
  type: string;
}

const BookmarkedTerms = ({ type }: Props) => {
  return (
    <>
      <GotoBookmark type={type} />
    </>
  );
};

export default BookmarkedTerms;
